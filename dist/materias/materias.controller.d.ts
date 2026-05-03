import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class MateriasController {
    private readonly materiasService;
    constructor(materiasService: MateriasService);
    findAll(query: PaginationQueryDto & {
        status?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/materia.schema").MateriaDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/materia.schema").Materia & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/materia.schema").MateriaDocument>;
    create(dto: CreateMateriaDto): Promise<import("./schemas/materia.schema").MateriaDocument>;
    update(id: Types.ObjectId, dto: UpdateMateriaDto): Promise<import("./schemas/materia.schema").MateriaDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
