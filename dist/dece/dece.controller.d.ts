import { DeceService } from './dece.service';
import { CreateDeceExpedienteDto } from './dto/create-dece-expediente.dto';
import { CreateDeceRegistroDto } from './dto/create-dece-registro.dto';
import { UpdateDeceRegistroDto } from './dto/update-dece-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Types } from 'mongoose';
declare class DeleteEvidenciaDto {
    url: string;
}
export declare class DeceController {
    private readonly svc;
    private readonly cloudinary;
    constructor(svc: DeceService, cloudinary: CloudinaryService);
    getMyExpediente(user: any): Promise<{
        expediente: import("./schemas/dece-expediente.schema").DeceExpedienteDocument;
        registros: (import("mongoose").Document<unknown, {}, import("./schemas/dece-registro.schema").DeceRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/dece-registro.schema").DeceRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findByStudent(id: Types.ObjectId): Promise<import("./schemas/dece-expediente.schema").DeceExpedienteDocument>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/dece-expediente.schema").DeceExpedienteDocument>;
    create(dto: CreateDeceExpedienteDto): Promise<import("./schemas/dece-expediente.schema").DeceExpedienteDocument>;
    getOrCreate(id: Types.ObjectId): Promise<import("./schemas/dece-expediente.schema").DeceExpedienteDocument>;
    remove(id: Types.ObjectId): Promise<void>;
    getRegistros(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/dece-registro.schema").DeceRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/dece-registro.schema").DeceRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addRegistro(id: Types.ObjectId, dto: CreateDeceRegistroDto, files?: Express.Multer.File[]): Promise<import("./schemas/dece-registro.schema").DeceRegistroDocument>;
    updateRegistro(expId: Types.ObjectId, regId: Types.ObjectId, dto: UpdateDeceRegistroDto, files?: Express.Multer.File[]): Promise<import("./schemas/dece-registro.schema").DeceRegistroDocument>;
    deleteRegistro(expId: Types.ObjectId, regId: Types.ObjectId): Promise<void>;
    deleteEvidencia(expId: Types.ObjectId, regId: Types.ObjectId, dto: DeleteEvidenciaDto): Promise<import("./schemas/dece-registro.schema").DeceRegistroDocument>;
}
export {};
