import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateTeacherFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateTeacherGeneralDto } from './dto/update-teacher-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    getMe(user: any): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    updateMyGeneral(user: any, dto: UpdateTeacherGeneralDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    updateMyMedical(user: any, dto: UpdateTeacherMedicalInfoDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    updateMyFamily(user: any, dto: UpdateTeacherFamilyInfoDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    getReporteMedico(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/teacher.schema").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/teacher.schema").Teacher & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/teacher.schema").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/teacher.schema").Teacher & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    create(dto: CreateTeacherDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    update(id: Types.ObjectId, dto: UpdateTeacherDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    updateMedical(id: Types.ObjectId, dto: UpdateTeacherMedicalInfoDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    updateFamily(id: Types.ObjectId, dto: UpdateTeacherFamilyInfoDto): Promise<import("./schemas/teacher.schema").TeacherDocument>;
    remove(id: Types.ObjectId): Promise<void>;
    uploadPhoto(id: Types.ObjectId, file: Express.Multer.File, type: 'credencial' | 'cuerpo', peso?: string, talla?: string): Promise<import("./schemas/teacher.schema").TeacherDocument>;
}
