import { AreaEstudioService } from './area-estudio.service';
import { CreateAreaEstudioDto } from './dto/create-area-estudio.dto';
import { UpdateAreaEstudioDto } from './dto/update-area-estudio.dto';
import { Types } from 'mongoose';
export declare class AreaEstudioController {
    private readonly service;
    constructor(service: AreaEstudioService);
    findAll(): Promise<import("./schemas/area-estudio.schema").AreaEstudioDocument[]>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/area-estudio.schema").AreaEstudioDocument>;
    create(dto: CreateAreaEstudioDto): Promise<import("./schemas/area-estudio.schema").AreaEstudioDocument>;
    update(id: Types.ObjectId, dto: UpdateAreaEstudioDto): Promise<import("./schemas/area-estudio.schema").AreaEstudioDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
