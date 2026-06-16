import { ExpedienteAcademicoService } from './expediente-academico.service';
import { CreateExpedienteAcademicoDocumentoDto } from './dto/create-expediente-academico-documento.dto';
import { UpdateExpedienteAcademicoDocumentoDto } from './dto/update-expediente-academico-documento.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class ExpedienteAcademicoController {
    private readonly svc;
    constructor(svc: ExpedienteAcademicoService);
    getMyExpediente(user: any): Promise<{
        expediente: import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico.schema").ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico.schema").ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getHijoExpediente(studentId: Types.ObjectId, user: any): Promise<{
        expediente: import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico.schema").ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico.schema").ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getSecciones(): Promise<string[]>;
    getSeccionesStats(): Promise<{
        nombre: string;
        count: number;
    }[]>;
    deleteSeccionGlobal(seccionName: string): Promise<{
        deleted: number;
    }>;
    findByStudent(id: Types.ObjectId): Promise<{
        expediente: import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico.schema").ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico.schema").ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getOrCreate(id: Types.ObjectId): Promise<import("./schemas/expediente-academico.schema").ExpedienteAcademicoDocument>;
    getDocumentos(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addDocumento(id: Types.ObjectId, dto: CreateExpedienteAcademicoDocumentoDto): Promise<import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument>;
    updateDocumento(expId: Types.ObjectId, docId: Types.ObjectId, dto: UpdateExpedienteAcademicoDocumentoDto): Promise<import("./schemas/expediente-academico-documento.schema").ExpedienteAcademicoDocumentoDocument>;
    deleteDocumento(expId: Types.ObjectId, docId: Types.ObjectId): Promise<void>;
    deleteSeccion(expId: Types.ObjectId, seccionName: string): Promise<void>;
    deleteExpediente(id: Types.ObjectId): Promise<void>;
}
