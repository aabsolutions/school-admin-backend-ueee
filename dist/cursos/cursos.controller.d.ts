import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { SetMateriasDto } from './dto/set-materias.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class CursosController {
    private readonly cursosService;
    constructor(cursosService: CursosService);
    findAll(query: PaginationQueryDto & {
        jornada?: string;
        status?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/curso.schema").CursoDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/curso.schema").Curso & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/curso.schema").CursoDocument>;
    create(dto: CreateCursoDto): Promise<import("./schemas/curso.schema").CursoDocument>;
    update(id: Types.ObjectId, dto: UpdateCursoDto): Promise<import("./schemas/curso.schema").CursoDocument>;
    remove(id: Types.ObjectId): Promise<void>;
    getMaterias(id: Types.ObjectId): Promise<Types.ObjectId[]>;
    setMaterias(id: Types.ObjectId, dto: SetMateriasDto): Promise<Types.ObjectId[]>;
}
