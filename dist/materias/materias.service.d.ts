import { Model } from 'mongoose';
import { Materia, MateriaDocument } from './schemas/materia.schema';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class MateriasService {
    private readonly materiaModel;
    constructor(materiaModel: Model<MateriaDocument>);
    findAll(query: PaginationQueryDto & {
        status?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, MateriaDocument, {}, import("mongoose").DefaultSchemaOptions> & Materia & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<MateriaDocument>;
    create(dto: CreateMateriaDto): Promise<MateriaDocument>;
    update(id: string, dto: UpdateMateriaDto): Promise<MateriaDocument>;
    remove(id: string): Promise<void>;
}
