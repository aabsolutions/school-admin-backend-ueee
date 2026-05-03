import { Model } from 'mongoose';
import { AreaEstudioDocument } from './schemas/area-estudio.schema';
import { CreateAreaEstudioDto } from './dto/create-area-estudio.dto';
import { UpdateAreaEstudioDto } from './dto/update-area-estudio.dto';
export declare class AreaEstudioService {
    private readonly model;
    constructor(model: Model<AreaEstudioDocument>);
    findAll(): Promise<AreaEstudioDocument[]>;
    findOne(id: string): Promise<AreaEstudioDocument>;
    create(dto: CreateAreaEstudioDto): Promise<AreaEstudioDocument>;
    update(id: string, dto: UpdateAreaEstudioDto): Promise<AreaEstudioDocument>;
    remove(id: string): Promise<void>;
}
