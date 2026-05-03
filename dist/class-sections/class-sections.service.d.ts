import { Model } from 'mongoose';
import { ClassSection, ClassSectionDocument } from './schemas/class-section.schema';
import { CreateClassSectionDto } from './dto/create-class-section.dto';
import { UpdateClassSectionDto } from './dto/update-class-section.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class ClassSectionsService {
    private readonly classSectionModel;
    constructor(classSectionModel: Model<ClassSectionDocument>);
    findAll(query: PaginationQueryDto & {
        courseId?: string;
        teacherId?: string;
        semester?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, ClassSectionDocument, {}, import("mongoose").DefaultSchemaOptions> & ClassSection & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<ClassSectionDocument>;
    create(dto: CreateClassSectionDto): Promise<ClassSectionDocument>;
    update(id: string, dto: UpdateClassSectionDto): Promise<ClassSectionDocument>;
    remove(id: string): Promise<void>;
}
