import { Model } from 'mongoose';
import { TramiteDocument, TramiteState, FilledValue } from '../schemas/tramite.schema';
import { TramiteHistoryDocument } from '../schemas/tramite-history.schema';
import { PlantillaDocument } from '../schemas/plantilla.schema';
import { InstitucionDocument } from '../../institucion/schemas/institucion.schema';
import { NotificationsService } from '../../notifications/notifications.service';
import { TemplateRendererService } from './template-renderer.service';
import { VariableResolverService } from './variable-resolver.service';
interface Actor {
    id: string;
    role: string;
    name: string;
}
export declare class TramiteWorkflowService {
    private readonly tramiteModel;
    private readonly historyModel;
    private readonly plantillaModel;
    private readonly institucionModel;
    private readonly notifications;
    private readonly renderer;
    private readonly resolver;
    constructor(tramiteModel: Model<TramiteDocument>, historyModel: Model<TramiteHistoryDocument>, plantillaModel: Model<PlantillaDocument>, institucionModel: Model<InstitucionDocument>, notifications: NotificationsService, renderer: TemplateRendererService, resolver: VariableResolverService);
    transitionState(tramiteId: string, newState: TramiteState, actor: Actor, observation?: string, respuestaValues?: FilledValue[], respuestaBodyOverride?: string): Promise<TramiteDocument>;
    writeInitialHistory(tramite: TramiteDocument, actor: Actor): Promise<void>;
    private emitTransitionNotifications;
    emitCreationNotifications(tramite: TramiteDocument, operativoId?: string): Promise<void>;
    private portalForRole;
}
export {};
