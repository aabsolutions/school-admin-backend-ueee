import { TramitesService } from '../services/tramites.service';
import { TramiteWorkflowService } from '../services/tramite-workflow.service';
import { PdfService } from '../services/pdf.service';
import { CreateTramiteDto } from '../dto/create-tramite.dto';
import { TransitionTramiteDto } from '../dto/transition-tramite.dto';
import { UploadAttachmentDto } from '../dto/upload-attachment.dto';
import { TramiteQueryDto } from '../dto/tramite-query.dto';
import type { Response as ExpressResponse } from 'express';
export declare class TramitesController {
    private readonly tramitesService;
    private readonly workflowService;
    private readonly pdfService;
    constructor(tramitesService: TramitesService, workflowService: TramiteWorkflowService, pdfService: PdfService);
    create(dto: CreateTramiteDto, req: any): Promise<import("../schemas/tramite.schema").TramiteDocument>;
    addAttachment(id: string, dto: UploadAttachmentDto, file: Express.Multer.File, req: any): Promise<import("../schemas/tramite.schema").TramiteDocument>;
    findMine(req: any, query: TramiteQueryDto): Promise<{
        data: (import("../schemas/tramite.schema").Tramite & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findInbox(req: any, query: TramiteQueryDto): Promise<{
        data: (import("../schemas/tramite.schema").Tramite & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOperatives(): Promise<import("mongodb").WithId<import("mongoose").AnyObject>[]>;
    findAll(query: TramiteQueryDto): Promise<{
        data: (import("../schemas/tramite.schema").Tramite & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: any): Promise<import("../schemas/tramite.schema").TramiteDocument>;
    getHistory(id: string, req: any): Promise<(import("../schemas/tramite-history.schema").TramiteHistory & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getPdf(id: string, req: any, res: ExpressResponse): Promise<void>;
    getPdfRespuesta(id: string, req: any, res: ExpressResponse): Promise<void>;
    transition(id: string, dto: TransitionTramiteDto, req: any): Promise<import("../schemas/tramite.schema").TramiteDocument>;
}
