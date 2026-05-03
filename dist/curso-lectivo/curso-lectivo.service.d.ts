import { Model } from 'mongoose';
import { CursoLectivo, CursoLectivoDocument } from './schemas/curso-lectivo.schema';
import { CreateCursoLectivoDto } from './dto/create-curso-lectivo.dto';
import { UpdateCursoLectivoDto } from './dto/update-curso-lectivo.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TeachersService } from '../teachers/teachers.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
export declare class CursoLectivoService {
    private readonly cursoLectivoModel;
    private readonly teachersService;
    private readonly enrollmentsService;
    private readonly logger;
    constructor(cursoLectivoModel: Model<CursoLectivoDocument>, teachersService: TeachersService, enrollmentsService: EnrollmentsService);
    findAll(query: PaginationQueryDto & {
        academicYear?: string;
        status?: string;
        cursoId?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, CursoLectivoDocument, {}, import("mongoose").DefaultSchemaOptions> & CursoLectivo & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<CursoLectivoDocument>;
    create(dto: CreateCursoLectivoDto): Promise<CursoLectivoDocument>;
    update(id: string, dto: UpdateCursoLectivoDto): Promise<CursoLectivoDocument>;
    remove(id: string): Promise<void>;
    findTutorAlumnos(userId: string): Promise<{
        cursoLectivo: import("mongoose").Document<unknown, {}, CursoLectivoDocument, {}, import("mongoose").DefaultSchemaOptions> & CursoLectivo & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        estudiantes: {
            dni: any;
            name: any;
            email: any;
            gender: any;
            birthdate: any;
            mobile: any;
        }[];
    }>;
}
