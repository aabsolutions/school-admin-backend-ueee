import { Model, Types } from 'mongoose';
import { DeceExpedienteDocument } from './schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroDocument } from './schemas/dece-registro.schema';
import { CreateDeceExpedienteDto } from './dto/create-dece-expediente.dto';
import { CreateDeceRegistroDto } from './dto/create-dece-registro.dto';
import { UpdateDeceRegistroDto } from './dto/update-dece-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { StudentsService } from '../students/students.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class DeceService {
    private readonly expedienteModel;
    private readonly registroModel;
    private readonly studentsService;
    private readonly notificationsService;
    constructor(expedienteModel: Model<DeceExpedienteDocument>, registroModel: Model<DeceRegistroDocument>, studentsService: StudentsService, notificationsService: NotificationsService);
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByStudent(studentId: string): Promise<DeceExpedienteDocument | null>;
    findByUserIdWithRegistros(userId: string): Promise<{
        expediente: DeceExpedienteDocument;
        registros: (import("mongoose").Document<unknown, {}, DeceRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & DeceRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findOne(id: string): Promise<DeceExpedienteDocument>;
    create(dto: CreateDeceExpedienteDto): Promise<DeceExpedienteDocument>;
    getOrCreate(studentId: string): Promise<DeceExpedienteDocument>;
    remove(id: string): Promise<void>;
    getRegistros(expedienteId: string): Promise<(import("mongoose").Document<unknown, {}, DeceRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & DeceRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addRegistro(expedienteId: string, dto: CreateDeceRegistroDto, evidencias?: string[]): Promise<DeceRegistroDocument>;
    updateRegistro(expedienteId: string, registroId: string, dto: UpdateDeceRegistroDto, newEvidencias?: string[]): Promise<DeceRegistroDocument>;
    deleteRegistro(expedienteId: string, registroId: string): Promise<void>;
    deleteEvidencia(expedienteId: string, registroId: string, url: string): Promise<DeceRegistroDocument>;
    getReporte(filters: {
        fechaDesde?: string;
        fechaHasta?: string;
        tipo?: string;
        creadoPor?: string;
        studentId?: string;
    }): Promise<any[]>;
}
