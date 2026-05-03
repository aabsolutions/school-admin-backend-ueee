import { Model, Types } from 'mongoose';
import { ExpedienteDocument } from './schemas/expediente.schema';
import { ExpedienteRegistro, ExpedienteRegistroDocument } from './schemas/expediente-registro.schema';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { CreateExpedienteRegistroDto } from './dto/create-expediente-registro.dto';
import { UpdateExpedienteRegistroDto } from './dto/update-expediente-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { StudentsService } from '../students/students.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ExpedientesService {
    private readonly expedienteModel;
    private readonly registroModel;
    private readonly studentsService;
    private readonly notificationsService;
    constructor(expedienteModel: Model<ExpedienteDocument>, registroModel: Model<ExpedienteRegistroDocument>, studentsService: StudentsService, notificationsService: NotificationsService);
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByStudent(studentId: string): Promise<ExpedienteDocument | null>;
    findByUserIdWithRegistros(userId: string): Promise<{
        expediente: ExpedienteDocument;
        registros: (import("mongoose").Document<unknown, {}, ExpedienteRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findOne(id: string): Promise<ExpedienteDocument>;
    create(dto: CreateExpedienteDto): Promise<ExpedienteDocument>;
    getOrCreate(studentId: string): Promise<ExpedienteDocument>;
    getReporte(filters: {
        fechaDesde?: string;
        fechaHasta?: string;
        tipo?: string;
        creadoPor?: string;
        studentId?: string;
    }): Promise<any[]>;
    remove(id: string): Promise<void>;
    getRegistros(expedienteId: string): Promise<(import("mongoose").Document<unknown, {}, ExpedienteRegistroDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteRegistro & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addRegistro(expedienteId: string, dto: CreateExpedienteRegistroDto, evidencias?: string[]): Promise<ExpedienteRegistroDocument>;
    updateRegistro(expedienteId: string, registroId: string, dto: UpdateExpedienteRegistroDto, newEvidencias?: string[]): Promise<ExpedienteRegistroDocument>;
    deleteRegistro(expedienteId: string, registroId: string): Promise<void>;
    deleteEvidencia(expedienteId: string, registroId: string, url: string): Promise<ExpedienteRegistroDocument>;
}
