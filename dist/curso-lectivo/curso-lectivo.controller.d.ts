import { CursoLectivoService } from './curso-lectivo.service';
import { CreateCursoLectivoDto } from './dto/create-curso-lectivo.dto';
import { UpdateCursoLectivoDto } from './dto/update-curso-lectivo.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class CursoLectivoController {
    private readonly cursoLectivoService;
    constructor(cursoLectivoService: CursoLectivoService);
    getMiTutorAlumnos(user: any): Promise<{
        cursoLectivo: import("mongoose").Document<unknown, {}, import("./schemas/curso-lectivo.schema").CursoLectivoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/curso-lectivo.schema").CursoLectivo & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
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
    findAll(query: PaginationQueryDto & {
        academicYear?: string;
        status?: string;
        cursoId?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/curso-lectivo.schema").CursoLectivoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/curso-lectivo.schema").CursoLectivo & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/curso-lectivo.schema").CursoLectivoDocument>;
    create(dto: CreateCursoLectivoDto): Promise<import("./schemas/curso-lectivo.schema").CursoLectivoDocument>;
    update(id: Types.ObjectId, dto: UpdateCursoLectivoDto): Promise<import("./schemas/curso-lectivo.schema").CursoLectivoDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
