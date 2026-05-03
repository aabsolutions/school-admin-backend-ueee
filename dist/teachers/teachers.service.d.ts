import { Model, Types } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateTeacherFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateTeacherGeneralDto } from './dto/update-teacher-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class TeachersService {
    private readonly teacherModel;
    private readonly userModel;
    private readonly cloudinaryService;
    constructor(teacherModel: Model<TeacherDocument>, userModel: Model<UserDocument>, cloudinaryService: CloudinaryService);
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<TeacherDocument>;
    create(dto: CreateTeacherDto): Promise<TeacherDocument>;
    update(id: string, dto: UpdateTeacherDto): Promise<TeacherDocument>;
    remove(id: string): Promise<void>;
    findByUserId(userId: string): Promise<TeacherDocument>;
    updateGeneralInfo(id: string, dto: UpdateTeacherGeneralDto): Promise<TeacherDocument>;
    updateMedicalInfo(id: string, dto: UpdateTeacherMedicalInfoDto): Promise<TeacherDocument>;
    updateFamilyInfo(id: string, dto: UpdateTeacherFamilyInfoDto): Promise<TeacherDocument>;
    getReporteMedico(filters: {
        hasDisability?: string;
        hasAllergies?: string;
        hasChronicCondition?: string;
        hasConadis?: string;
        bloodType?: string;
        maritalStatus?: string;
        numberOfChildren?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    uploadPhoto(id: string, file: Express.Multer.File, type: 'credencial' | 'cuerpo', peso?: number, talla?: number): Promise<TeacherDocument>;
}
