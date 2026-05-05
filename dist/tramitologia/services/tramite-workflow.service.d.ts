import { Model } from 'mongoose';
import { TramiteDocument, TramiteState } from '../schemas/tramite.schema';
import { TramiteHistoryDocument } from '../schemas/tramite-history.schema';
import { NotificationsService } from '../../notifications/notifications.service';
interface Actor {
    id: string;
    role: string;
    name: string;
}
export declare class TramiteWorkflowService {
    private readonly tramiteModel;
    private readonly historyModel;
    private readonly notifications;
    constructor(tramiteModel: Model<TramiteDocument>, historyModel: Model<TramiteHistoryDocument>, notifications: NotificationsService);
    transitionState(tramiteId: string, newState: TramiteState, actor: Actor, observation?: string): Promise<TramiteDocument>;
    writeInitialHistory(tramite: TramiteDocument, actor: Actor): Promise<void>;
    private emitTransitionNotifications;
    emitCreationNotifications(tramite: TramiteDocument, operativoId?: string): Promise<void>;
    private portalForRole;
}
export {};
