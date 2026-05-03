import { InstitucionService } from './institucion.service';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
export declare class InstitucionController {
    private readonly service;
    constructor(service: InstitucionService);
    getInstitucion(): Promise<import("./schemas/institucion.schema").InstitucionDocument>;
    updateInstitucion(dto: UpdateInstitucionDto): Promise<import("./schemas/institucion.schema").InstitucionDocument>;
    uploadLogo(file: Express.Multer.File): Promise<import("./schemas/institucion.schema").InstitucionDocument>;
}
