import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { CreateExpedienteRegistroDto } from './dto/create-expediente-registro.dto';
import { UpdateExpedienteRegistroDto } from './dto/update-expediente-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Types } from 'mongoose';
declare class DeleteEvidenciaDto {
    url: string;
}
export declare class ExpedientesController {
    private readonly svc;
    private readonly cloudinary;
    constructor(svc: ExpedientesService, cloudinary: CloudinaryService);
    getMyExpediente(user: any): Promise<{
        expediente: import("./schemas/expediente.schema").ExpedienteDocument;
        registros: (import("mongoose").Document<unknown, {}, import("./schemas/expediente-registro.schema").ExpedienteRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-registro.schema").ExpedienteRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getReporte(fechaDesde?: string, fechaHasta?: string, tipo?: string, creadoPor?: string, studentId?: string): Promise<any[]>;
    findByStudent(id: Types.ObjectId): Promise<import("./schemas/expediente.schema").ExpedienteDocument>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/expediente.schema").ExpedienteDocument>;
    create(dto: CreateExpedienteDto): Promise<import("./schemas/expediente.schema").ExpedienteDocument>;
    getOrCreate(id: Types.ObjectId): Promise<import("./schemas/expediente.schema").ExpedienteDocument>;
    remove(id: Types.ObjectId): Promise<void>;
    getRegistros(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/expediente-registro.schema").ExpedienteRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/expediente-registro.schema").ExpedienteRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addRegistro(id: Types.ObjectId, dto: CreateExpedienteRegistroDto, files?: Express.Multer.File[]): Promise<import("./schemas/expediente-registro.schema").ExpedienteRegistroDocument>;
    updateRegistro(expId: Types.ObjectId, regId: Types.ObjectId, dto: UpdateExpedienteRegistroDto, files?: Express.Multer.File[]): Promise<import("./schemas/expediente-registro.schema").ExpedienteRegistroDocument>;
    deleteRegistro(expId: Types.ObjectId, regId: Types.ObjectId): Promise<void>;
    deleteEvidencia(expId: Types.ObjectId, regId: Types.ObjectId, dto: DeleteEvidenciaDto): Promise<import("./schemas/expediente-registro.schema").ExpedienteRegistroDocument>;
}
export {};
