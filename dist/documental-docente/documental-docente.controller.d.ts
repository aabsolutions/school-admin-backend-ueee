import { DocumentalDocenteService } from './documental-docente.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TeachersService } from '../teachers/teachers.service';
import { Types } from 'mongoose';
declare class UploadDocumentoDto {
    nombre: string;
    categoria: 'profesional' | 'planificacion';
    descripcion?: string;
}
export declare class DocumentalDocenteController {
    private readonly svc;
    private readonly cloudinary;
    private readonly teachersService;
    constructor(svc: DocumentalDocenteService, cloudinary: CloudinaryService, teachersService: TeachersService);
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getByTeacher(id: Types.ObjectId): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
    uploadForTeacher(teacherId: Types.ObjectId, dto: UploadDocumentoDto, file: Express.Multer.File): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
    deleteForTeacher(teacherId: Types.ObjectId, docId: string): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
    getMe(user: any): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
    uploadMe(user: any, dto: UploadDocumentoDto, file: Express.Multer.File): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
    deleteMe(user: any, docId: string): Promise<import("./schemas/documental-docente.schema").DocumentalDocenteDocument>;
}
export {};
