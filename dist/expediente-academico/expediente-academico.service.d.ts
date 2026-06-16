import { Model, Types } from 'mongoose';
import { ExpedienteAcademico, ExpedienteAcademicoDocument } from './schemas/expediente-academico.schema';
import { ExpedienteAcademicoDocumento, ExpedienteAcademicoDocumentoDocument } from './schemas/expediente-academico-documento.schema';
import { CreateExpedienteAcademicoDocumentoDto } from './dto/create-expediente-academico-documento.dto';
import { UpdateExpedienteAcademicoDocumentoDto } from './dto/update-expediente-academico-documento.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { StudentsService } from '../students/students.service';
import { ParentsService } from '../parents/parents.service';
import { StudentDocument } from '../students/schemas/student.schema';
export declare class ExpedienteAcademicoService {
    private readonly expedienteModel;
    private readonly documentoModel;
    private readonly studentModel;
    private readonly studentsService;
    private readonly parentsService;
    constructor(expedienteModel: Model<ExpedienteAcademicoDocument>, documentoModel: Model<ExpedienteAcademicoDocumentoDocument>, studentModel: Model<StudentDocument>, studentsService: StudentsService, parentsService: ParentsService);
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getOrCreate(studentId: string): Promise<ExpedienteAcademicoDocument>;
    findByStudent(studentId: string): Promise<{
        expediente: import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findMyExpediente(userId: string): Promise<{
        expediente: import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    findHijoExpediente(parentUserId: string, studentId: string): Promise<{
        expediente: import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademico & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        documentos: (import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getSeccionesGlobales(): Promise<string[]>;
    getSeccionesStats(): Promise<{
        nombre: string;
        count: number;
    }[]>;
    deleteSeccionGlobal(seccionName: string): Promise<{
        deleted: number;
    }>;
    getDocumentos(expedienteId: string): Promise<(import("mongoose").Document<unknown, {}, ExpedienteAcademicoDocumentoDocument, {}, import("mongoose").DefaultSchemaOptions> & ExpedienteAcademicoDocumento & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addDocumento(expedienteId: string, dto: CreateExpedienteAcademicoDocumentoDto): Promise<ExpedienteAcademicoDocumentoDocument>;
    updateDocumento(expedienteId: string, docId: string, dto: UpdateExpedienteAcademicoDocumentoDto): Promise<ExpedienteAcademicoDocumentoDocument>;
    deleteDocumento(expedienteId: string, docId: string): Promise<void>;
    deleteSeccion(expedienteId: string, seccionName: string): Promise<void>;
    deleteExpediente(id: string): Promise<void>;
}
