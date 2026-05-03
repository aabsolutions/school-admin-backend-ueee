import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/course.schema").CourseDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/course.schema").Course & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/course.schema").CourseDocument>;
    create(dto: CreateCourseDto): Promise<import("./schemas/course.schema").CourseDocument>;
    update(id: Types.ObjectId, dto: UpdateCourseDto): Promise<import("./schemas/course.schema").CourseDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
