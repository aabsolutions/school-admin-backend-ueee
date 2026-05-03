import { Model, Types } from 'mongoose';
import { Parent, ParentDocument } from './schemas/parent.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class ParentsService {
    private readonly parentModel;
    private readonly studentModel;
    private readonly userModel;
    constructor(parentModel: Model<ParentDocument>, studentModel: Model<StudentDocument>, userModel: Model<UserDocument>);
    create(dto: CreateParentDto): Promise<ParentDocument>;
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, ParentDocument, {}, import("mongoose").DefaultSchemaOptions> & Parent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<ParentDocument>;
    findByUserId(userId: string): Promise<ParentDocument>;
    searchByName(q: string, studentId?: string): Promise<(Parent & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getHijos(parentUserId: string): Promise<(Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateParentDto): Promise<ParentDocument>;
    linkStudents(parentId: string, studentIds: string[]): Promise<ParentDocument>;
    unlinkStudent(parentId: string, studentId: string): Promise<ParentDocument>;
    remove(id: string): Promise<void>;
    private _linkStudents;
}
