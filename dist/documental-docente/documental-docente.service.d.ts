import { Model } from 'mongoose';
import { DocumentalDocenteDocument } from './schemas/documental-docente.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class DocumentalDocenteService {
    private readonly model;
    constructor(model: Model<DocumentalDocenteDocument>);
    findAll(query: PaginationQueryDto): Promise<{
        data: any[];
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByTeacher(teacherId: string): Promise<DocumentalDocenteDocument>;
    getOrCreate(teacherId: string): Promise<DocumentalDocenteDocument>;
    addDocumento(teacherId: string, nombre: string, categoria: 'profesional' | 'planificacion', url: string, descripcion?: string): Promise<DocumentalDocenteDocument>;
    deleteDocumento(teacherId: string, docId: string): Promise<{
        url: string;
        record: DocumentalDocenteDocument;
    }>;
}
