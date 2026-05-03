import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class CoursesService {
    private readonly courseModel;
    constructor(courseModel: Model<CourseDocument>);
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, CourseDocument, {}, import("mongoose").DefaultSchemaOptions> & Course & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<CourseDocument>;
    create(dto: CreateCourseDto): Promise<CourseDocument>;
    update(id: string, dto: UpdateCourseDto): Promise<CourseDocument>;
    remove(id: string): Promise<void>;
}
