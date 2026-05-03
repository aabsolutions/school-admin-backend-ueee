import { Model, Types } from 'mongoose';
import { Curso, CursoDocument } from './schemas/curso.schema';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class CursosService {
    private readonly cursoModel;
    constructor(cursoModel: Model<CursoDocument>);
    findAll(query: PaginationQueryDto & {
        jornada?: string;
        status?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, CursoDocument, {}, import("mongoose").DefaultSchemaOptions> & Curso & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<CursoDocument>;
    create(dto: CreateCursoDto): Promise<CursoDocument>;
    update(id: string, dto: UpdateCursoDto): Promise<CursoDocument>;
    remove(id: string): Promise<void>;
    getMaterias(id: string): Promise<Types.ObjectId[]>;
    setMaterias(id: string, materiaIds: string[]): Promise<Types.ObjectId[]>;
}
