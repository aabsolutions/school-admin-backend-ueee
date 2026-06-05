import {
  Injectable, BadRequestException, ForbiddenException, NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tramite, TramiteDocument, TramiteState, FilledValue } from '../schemas/tramite.schema';
import { TramiteHistory, TramiteHistoryDocument } from '../schemas/tramite-history.schema';
import { Plantilla, PlantillaDocument } from '../schemas/plantilla.schema';
import { Institucion, InstitucionDocument } from '../../institucion/schemas/institucion.schema';
import { NotificationsService } from '../../notifications/notifications.service';
import { isValidTransition } from '../constants/state-machine';
import { TemplateRendererService } from './template-renderer.service';
import { VariableResolverService } from './variable-resolver.service';

interface Actor {
  id: string;
  role: string;
  name: string;
}

const TERMINAL_STATES: TramiteState[] = [TramiteState.Rechazado, TramiteState.Finalizado];
const TRANSITION_ACTORS = new Set(['TRAMITE_ADMIN', 'TRAMITE_OPERATIVO', 'ADMIN', 'SUPERADMIN']);

@Injectable()
export class TramiteWorkflowService {
  constructor(
    @InjectModel(Tramite.name) private readonly tramiteModel: Model<TramiteDocument>,
    @InjectModel(TramiteHistory.name) private readonly historyModel: Model<TramiteHistoryDocument>,
    @InjectModel(Plantilla.name) private readonly plantillaModel: Model<PlantillaDocument>,
    @InjectModel(Institucion.name) private readonly institucionModel: Model<InstitucionDocument>,
    private readonly notifications: NotificationsService,
    private readonly renderer: TemplateRendererService,
    private readonly resolver: VariableResolverService,
  ) {}

  async transitionState(
    tramiteId: string,
    newState: TramiteState,
    actor: Actor,
    observation?: string,
    respuestaValues?: FilledValue[],
    respuestaBodyOverride?: string,
  ): Promise<TramiteDocument> {
    const tramite = await this.tramiteModel.findById(tramiteId).exec();
    if (!tramite) throw new NotFoundException(`Trámite ${tramiteId} no encontrado`);

    if (!isValidTransition(tramite.state, newState)) {
      throw new BadRequestException(
        `Transición inválida: ${tramite.state} → ${newState}`,
      );
    }

    const isAdmin = actor.role === 'SUPERADMIN' || actor.role === 'ADMIN' || actor.role === 'TRAMITE_ADMIN';
    const isAssignedOperativo =
      actor.role === 'TRAMITE_OPERATIVO' &&
      tramite.operativoUserId?.toString() === actor.id;

    if (!isAdmin && !isAssignedOperativo) {
      throw new ForbiddenException('No tenés permisos para cambiar el estado de este trámite');
    }

    if (newState === TramiteState.Rechazado && !observation?.trim()) {
      throw new BadRequestException('La observación es obligatoria al rechazar un trámite');
    }

    const fromState = tramite.state;
    const isTerminal = TERMINAL_STATES.includes(newState);

    const updateFields: Record<string, unknown> = {
      state: newState,
      ...(observation ? { lastObservation: observation } : {}),
      ...(isTerminal ? { closedAt: new Date() } : {}),
    };

    const isResolution = newState === TramiteState.Aprobado || newState === TramiteState.Finalizado;
    if (isResolution && tramite.plantilla.plantillaRespuestaId) {
      const plantillaRespuesta = await this.plantillaModel
        .findById(tramite.plantilla.plantillaRespuestaId)
        .lean()
        .exec();

      if (plantillaRespuesta) {
        const extraSysVars = await this.resolver.resolve(
          {
            estudianteId: tramite.estudianteId,
            datosRepresentante: tramite.datosRepresentante as any,
            codigo: tramite.codigo,
            cursoNombre: tramite.cursoNombre,
          },
          actor,
          observation,
        );

        const effectiveSnapshot = respuestaBodyOverride
          ? { ...plantillaRespuesta, bodyHtml: respuestaBodyOverride }
          : plantillaRespuesta;

        const respuestaRenderedHtml = this.renderer.render(
          effectiveSnapshot as any,
          (respuestaValues ?? []) as any,
          {
            fechaActual: extraSysVars['FECHA_ACTUAL'],
            usuarioLogueado: actor.name,
            idTramite: tramite.codigo,
            extraSysVars,
          },
        );

        updateFields['respuestaRenderedHtml'] = respuestaRenderedHtml;
        updateFields['respuestaValues'] = respuestaValues ?? [];

        if (respuestaBodyOverride) {
          updateFields['respuestaBodyOverrideHtml'] = respuestaBodyOverride;
        }

        // Snapshot membrete from current institution config
        const institucion = await this.institucionModel.findOne().lean().exec();
        if (institucion?.membrete) {
          updateFields['respuestaMembreteUrl'] = (institucion as any).membrete;
          updateFields['membreteConfig'] = {
            topMm: (institucion as any).membreteContentTopMm ?? 40,
            bottomMm: (institucion as any).membreteContentBottomMm ?? 40,
          };
        }
      }
    }

    await this.tramiteModel.findByIdAndUpdate(tramiteId, updateFields).exec();

    await this.historyModel.create({
      tramiteId: new Types.ObjectId(tramiteId),
      fromState,
      toState: newState,
      actorUserId: new Types.ObjectId(actor.id),
      actorRole: actor.role,
      observation: observation ?? '',
    });

    const updated = await this.tramiteModel.findById(tramiteId).exec();
    if (!updated) throw new NotFoundException(`Trámite ${tramiteId} no encontrado`);

    await this.emitTransitionNotifications(updated, fromState, newState, actor, observation);

    return updated;
  }

  async writeInitialHistory(tramite: TramiteDocument, actor: Actor): Promise<void> {
    await this.historyModel.create({
      tramiteId: tramite._id,
      fromState: 'created',
      toState: TramiteState.Pendiente,
      actorUserId: new Types.ObjectId(actor.id),
      actorRole: actor.role,
      observation: '',
    });
  }

  private async emitTransitionNotifications(
    tramite: TramiteDocument,
    fromState: TramiteState,
    newState: TramiteState,
    actor: Actor,
    observation?: string,
  ): Promise<void> {
    const solicitanteId = tramite.solicitanteUserId.toString();
    const operativoId = tramite.operativoUserId?.toString();
    const codigo = tramite.codigo;
    const plantillaNombre = tramite.plantilla.nombre;

    const notifs: Array<{ recipientId: string; title: string; body: string; link: string }> = [];

    const solicitantePortal = this.portalForRole(tramite.solicitanteRole);
    const tramiteLink = (portal: string) => `/${portal}/tramitologia/detalle/${tramite._id}`;

    switch (newState) {
      case TramiteState.EnProceso:
        notifs.push({
          recipientId: solicitanteId,
          title: 'Trámite en proceso',
          body: `${codigo} fue tomado por ${actor.name}`,
          link: tramiteLink(solicitantePortal),
        });
        break;
      case TramiteState.Aprobado:
        notifs.push({
          recipientId: solicitanteId,
          title: 'Trámite aprobado',
          body: observation ?? `${plantillaNombre} — ${codigo}`,
          link: tramiteLink(solicitantePortal),
        });
        break;
      case TramiteState.Rechazado:
        notifs.push({
          recipientId: solicitanteId,
          title: 'Trámite rechazado',
          body: observation ?? '',
          link: tramiteLink(solicitantePortal),
        });
        break;
      case TramiteState.Finalizado:
        notifs.push({
          recipientId: solicitanteId,
          title: 'Trámite finalizado',
          body: 'Disponible para descarga PDF',
          link: tramiteLink(solicitantePortal),
        });
        break;
    }

    if (operativoId && operativoId !== actor.id) {
      notifs.push({
        recipientId: operativoId,
        title: 'Trámite actualizado',
        body: `${codigo} — ${plantillaNombre} pasó a estado ${newState}`,
        link: tramiteLink('admin'),
      });
    }

    await Promise.all(
      notifs.map((n) =>
        this.notifications.create(n.recipientId, 'tramitologia', n.title, n.body, n.link).catch(() => null),
      ),
    );
  }

  async emitCreationNotifications(tramite: TramiteDocument, operativoId?: string): Promise<void> {
    const solicitanteId = tramite.solicitanteUserId.toString();
    const codigo = tramite.codigo;
    const plantillaNombre = tramite.plantilla.nombre;
    const solicitantePortal = this.portalForRole(tramite.solicitanteRole);

    await this.notifications.create(
      solicitanteId,
      'tramitologia',
      'Trámite recibido',
      `${plantillaNombre} — ${codigo}`,
      `/${solicitantePortal}/tramitologia/detalle/${tramite._id}`,
    ).catch(() => null);

    if (operativoId) {
      await this.notifications.create(
        operativoId,
        'tramitologia',
        'Nuevo trámite asignado',
        `${plantillaNombre} — ${codigo}`,
        `/admin/tramitologia/detalle/${tramite._id}`,
      ).catch(() => null);
    }
  }

  private portalForRole(role: string): string {
    const map: Record<string, string> = {
      STUDENT: 'student',
      TEACHER: 'teacher',
      PARENT: 'parent',
    };
    return map[role] ?? 'admin';
  }
}
