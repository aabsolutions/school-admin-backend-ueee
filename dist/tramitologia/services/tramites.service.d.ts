import { Model, Types } from 'mongoose';
import { Tramite, TramiteDocument } from '../schemas/tramite.schema';
import { TramiteHistory, TramiteHistoryDocument } from '../schemas/tramite-history.schema';
import { PlantillaDocument } from '../schemas/plantilla.schema';
import { CreateTramiteDto } from '../dto/create-tramite.dto';
import { TramiteQueryDto } from '../dto/tramite-query.dto';
import { TramiteWorkflowService } from './tramite-workflow.service';
import { TramiteCodigoService } from './tramite-codigo.service';
import { TemplateRendererService } from './template-renderer.service';
import { VariableResolverService } from './variable-resolver.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
interface UserContext {
    id: string;
    role: string;
    name: string;
    username: string;
}
export declare class TramitesService {
    private readonly tramiteModel;
    private readonly historyModel;
    private readonly plantillaModel;
    private readonly workflow;
    private readonly codigoService;
    private readonly renderer;
    private readonly resolver;
    private readonly cloudinary;
    constructor(tramiteModel: Model<TramiteDocument>, historyModel: Model<TramiteHistoryDocument>, plantillaModel: Model<PlantillaDocument>, workflow: TramiteWorkflowService, codigoService: TramiteCodigoService, renderer: TemplateRendererService, resolver: VariableResolverService, cloudinary: CloudinaryService);
    create(dto: CreateTramiteDto, user: UserContext): Promise<TramiteDocument>;
    addAttachment(tramiteId: string, file: Express.Multer.File, name: string, uploadedBy: string): Promise<TramiteDocument>;
    findMine(userId: string, query: TramiteQueryDto): Promise<{
        data: (Tramite & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findInbox(operativoId: string, query: TramiteQueryDto): Promise<{
        data: (Tramite & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAll(query: TramiteQueryDto): Promise<{
        data: (Tramite & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<TramiteDocument>;
    findHistory(tramiteId: string): Promise<(TramiteHistory & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOperatives(): Promise<import("mongodb").WithId<import("mongoose").AnyObject>[]>;
    canAccess(tramite: TramiteDocument, user: UserContext): boolean;
    private paginatedQuery;
}
export {};
