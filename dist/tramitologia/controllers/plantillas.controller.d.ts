import { PlantillasService } from '../services/plantillas.service';
import { VariableParserService } from '../services/variable-parser.service';
import { CreatePlantillaDto } from '../dto/create-plantilla.dto';
import { UpdatePlantillaDto } from '../dto/update-plantilla.dto';
import { ParseVariablesDto } from '../dto/parse-variables.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class PlantillasController {
    private readonly plantillasService;
    private readonly varParser;
    constructor(plantillasService: PlantillasService, varParser: VariableParserService);
    create(dto: CreatePlantillaDto, req: any): Promise<import("../schemas/plantilla.schema").PlantillaDocument>;
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("../schemas/plantilla.schema").Plantilla & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAvailable(req: any): Promise<import("../schemas/plantilla.schema").PlantillaDocument[]>;
    parseVariables(dto: ParseVariablesDto): import("../services/variable-parser.service").ParsedVariables;
    findOne(id: string): Promise<import("../schemas/plantilla.schema").PlantillaDocument>;
    update(id: string, dto: UpdatePlantillaDto): Promise<import("../schemas/plantilla.schema").PlantillaDocument>;
    remove(id: string): Promise<void>;
}
