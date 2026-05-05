import {
  Injectable, NotFoundException, BadRequestException, ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tramite, TramiteDocument, TramiteState } from '../schemas/tramite.schema';
import { TramiteHistory, TramiteHistoryDocument } from '../schemas/tramite-history.schema';
import { Plantilla, PlantillaDocument } from '../schemas/plantilla.schema';
import { CreateTramiteDto } from '../dto/create-tramite.dto';
import { TramiteQueryDto } from '../dto/tramite-query.dto';
import { TramiteWorkflowService } from './tramite-workflow.service';
import { TramiteCodigoService } from './tramite-codigo.service';
import { TemplateRendererService } from './template-renderer.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

interface UserContext {
  id: string;
  role: string;
  name: string;
  username: string;
}

@Injectable()
export class TramitesService {
  constructor(
    @InjectModel(Tramite.name) private readonly tramiteModel: Model<TramiteDocument>,
    @InjectModel(TramiteHistory.name) private readonly historyModel: Model<TramiteHistoryDocument>,
    @InjectModel(Plantilla.name) private readonly plantillaModel: Model<PlantillaDocument>,
    private readonly workflow: TramiteWorkflowService,
    private readonly codigoService: TramiteCodigoService,
    private readonly renderer: TemplateRendererService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateTramiteDto, user: UserContext): Promise<TramiteDocument> {
    const plantilla = await this.plantillaModel.findById(dto.plantillaId).exec();
    if (!plantilla || !plantilla.isActive) {
      throw new NotFoundException(`Plantilla ${dto.plantillaId} no encontrada o inactiva`);
    }

    if (!plantilla.solicitanteRoles.includes(user.role)) {
      throw new ForbiddenException('Tu rol no puede solicitar esta plantilla');
    }

    const codigo = await this.codigoService.nextCodigo();

    const snapshot = {
      plantillaId: plantilla._id as Types.ObjectId,
      nombre: plantilla.nombre,
      version: plantilla.version,
      bodyHtml: plantilla.bodyHtml,
      variables: plantilla.variables,
      requiredAttachments: plantilla.requiredAttachments,
    };

    const values = dto.values ?? [];
    const renderedHtml = this.renderer.render(snapshot as any, values as any, {
      fechaActual: new Date().toLocaleDateString('es-EC'),
      usuarioLogueado: user.name,
      idTramite: codigo,
    });

    const tramite = await new this.tramiteModel({
      codigo,
      plantilla: snapshot,
      solicitanteUserId: new Types.ObjectId(user.id),
      solicitanteRole: user.role,
      operativoUserId: dto.operativoUserId ? new Types.ObjectId(dto.operativoUserId) : undefined,
      values,
      renderedHtml,
      state: TramiteState.Pendiente,
    }).save();

    await this.workflow.writeInitialHistory(tramite, { id: user.id, role: user.role, name: user.name });
    await this.workflow.emitCreationNotifications(tramite, dto.operativoUserId);

    return tramite;
  }

  async addAttachment(
    tramiteId: string,
    file: Express.Multer.File,
    name: string,
    uploadedBy: string,
  ): Promise<TramiteDocument> {
    const tramite = await this.findById(tramiteId);
    const url = await this.cloudinary.uploadBuffer(file.buffer, 'tramitologia');
    await this.tramiteModel.findByIdAndUpdate(tramiteId, {
      $push: {
        attachments: {
          name,
          url,
          mime: file.mimetype,
          sizeBytes: file.size,
          uploadedAt: new Date(),
          uploadedBy: new Types.ObjectId(uploadedBy),
        },
      },
    }).exec();
    return this.findById(tramiteId);
  }

  async findMine(userId: string, query: TramiteQueryDto) {
    return this.paginatedQuery({ solicitanteUserId: new Types.ObjectId(userId) }, query);
  }

  async findInbox(operativoId: string, query: TramiteQueryDto) {
    return this.paginatedQuery({ operativoUserId: new Types.ObjectId(operativoId) }, query);
  }

  async findAll(query: TramiteQueryDto) {
    return this.paginatedQuery({}, query);
  }

  async findById(id: string): Promise<TramiteDocument> {
    const tramite = await this.tramiteModel.findById(id).exec();
    if (!tramite) throw new NotFoundException(`Trámite ${id} no encontrado`);
    return tramite;
  }

  async findHistory(tramiteId: string) {
    return this.historyModel
      .find({ tramiteId: new Types.ObjectId(tramiteId) })
      .sort({ createdAt: 1 })
      .populate('actorUserId', 'name username role')
      .lean()
      .exec();
  }

  async findOperatives() {
    const { User } = await import('../../users/schemas/user.schema');
    return this.tramiteModel.db
      .collection('users')
      .find({ role: 'TRAMITE_OPERATIVO', isActive: true }, { projection: { password: 0 } })
      .toArray();
  }

  canAccess(tramite: TramiteDocument, user: UserContext): boolean {
    const isAdmin = ['ADMIN', 'SUPERADMIN', 'TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'].includes(user.role);
    const isOwner = tramite.solicitanteUserId.toString() === user.id;
    const isOperativo = tramite.operativoUserId?.toString() === user.id;
    return isAdmin || isOwner || isOperativo;
  }

  private async paginatedQuery(baseFilter: Record<string, unknown>, query: TramiteQueryDto) {
    const { page = 1, limit = 10, state, plantillaId, solicitanteUserId, dateFrom, dateTo, operativoUserId } = query;
    const filter = { ...baseFilter } as Record<string, unknown>;

    if (state) filter['state'] = state;
    if (plantillaId) filter['plantilla.plantillaId'] = new Types.ObjectId(plantillaId);
    if (solicitanteUserId) filter['solicitanteUserId'] = new Types.ObjectId(solicitanteUserId);
    if (operativoUserId) filter['operativoUserId'] = new Types.ObjectId(operativoUserId);
    if (dateFrom || dateTo) {
      filter['createdAt'] = {};
      if (dateFrom) (filter['createdAt'] as any).$gte = new Date(dateFrom);
      if (dateTo) (filter['createdAt'] as any).$lte = new Date(dateTo);
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.tramiteModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
      this.tramiteModel.countDocuments(filter),
    ]);
    return { data, total, page, limit };
  }
}
