import { Model } from 'mongoose';
import { InstitucionDocument } from './schemas/institucion.schema';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class InstitucionService {
    private readonly model;
    private readonly cloudinaryService;
    constructor(model: Model<InstitucionDocument>, cloudinaryService: CloudinaryService);
    getInstitucion(): Promise<InstitucionDocument>;
    updateInstitucion(dto: UpdateInstitucionDto): Promise<InstitucionDocument>;
    uploadLogo(file: Express.Multer.File): Promise<InstitucionDocument>;
}
