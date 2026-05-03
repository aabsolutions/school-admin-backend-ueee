import { ClassSectionsService } from './class-sections.service';
import { CreateClassSectionDto } from './dto/create-class-section.dto';
import { UpdateClassSectionDto } from './dto/update-class-section.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class ClassSectionsController {
    private readonly classSectionsService;
    constructor(classSectionsService: ClassSectionsService);
    findAll(query: PaginationQueryDto & {
        courseId?: string;
        teacherId?: string;
        semester?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/class-section.schema").ClassSectionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class-section.schema").ClassSection & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/class-section.schema").ClassSectionDocument>;
    create(dto: CreateClassSectionDto): Promise<import("./schemas/class-section.schema").ClassSectionDocument>;
    update(id: Types.ObjectId, dto: UpdateClassSectionDto): Promise<import("./schemas/class-section.schema").ClassSectionDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
