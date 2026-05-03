import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { LinkStudentsDto } from './dto/link-students.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class ParentsController {
    private readonly svc;
    constructor(svc: ParentsService);
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/parent.schema").ParentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/parent.schema").Parent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    create(dto: CreateParentDto): Promise<import("./schemas/parent.schema").ParentDocument>;
    search(q?: string, studentId?: string): Promise<(import("./schemas/parent.schema").Parent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getMe(user: any): Promise<import("./schemas/parent.schema").ParentDocument>;
    getHijos(user: any): Promise<(import("../students/schemas/student.schema").Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/parent.schema").ParentDocument>;
    update(id: Types.ObjectId, dto: UpdateParentDto): Promise<import("./schemas/parent.schema").ParentDocument>;
    linkStudents(id: Types.ObjectId, dto: LinkStudentsDto): Promise<import("./schemas/parent.schema").ParentDocument>;
    unlinkStudent(id: Types.ObjectId, studentId: Types.ObjectId): Promise<import("./schemas/parent.schema").ParentDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
