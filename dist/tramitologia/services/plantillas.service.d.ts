import { Model, Types } from 'mongoose';
import { Plantilla, PlantillaDocument } from '../schemas/plantilla.schema';
import { CreatePlantillaDto } from '../dto/create-plantilla.dto';
import { UpdatePlantillaDto } from '../dto/update-plantilla.dto';
import { VariableParserService } from './variable-parser.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class PlantillasService {
    private readonly plantillaModel;
    private readonly varParser;
    constructor(plantillaModel: Model<PlantillaDocument>, varParser: VariableParserService);
    create(dto: CreatePlantillaDto, userId: string): Promise<PlantillaDocument>;
    findAll(query: PaginationQueryDto & {
        tipo?: string;
    }): Promise<{
        data: (Plantilla & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAvailable(userRole: string): Promise<PlantillaDocument[]>;
    findOne(id: string): Promise<PlantillaDocument>;
    update(id: string, dto: UpdatePlantillaDto): Promise<PlantillaDocument>;
    private validateRespuesta;
    softDelete(id: string): Promise<void>;
}
