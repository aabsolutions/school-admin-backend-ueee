import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { ParentDocument } from '../parents/schemas/parent.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateStudentMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateStudentFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateStudentGeneralDto } from './dto/update-student-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class StudentsService {
    private readonly studentModel;
    private readonly userModel;
    private readonly parentModel;
    private readonly cloudinaryService;
    private readonly logger;
    constructor(studentModel: Model<StudentDocument>, userModel: Model<UserDocument>, parentModel: Model<ParentDocument>, cloudinaryService: CloudinaryService);
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<StudentDocument>;
    create(dto: CreateStudentDto): Promise<StudentDocument>;
    update(id: string, dto: UpdateStudentDto): Promise<StudentDocument>;
    private _deriveParentIds;
    remove(id: string): Promise<void>;
    toggleStatus(id: string, status: string): Promise<StudentDocument>;
    findByUserId(userId: string): Promise<StudentDocument>;
    updateGeneralInfo(id: string, dto: UpdateStudentGeneralDto): Promise<StudentDocument>;
    updateMedicalInfo(id: string, dto: UpdateStudentMedicalInfoDto): Promise<StudentDocument>;
    updateFamilyInfo(id: string, dto: UpdateStudentFamilyInfoDto): Promise<StudentDocument>;
    getReporteMedico(filters: {
        hasDisability?: string;
        hasAllergies?: string;
        hasChronicCondition?: string;
        hasConadis?: string;
        bloodType?: string;
        familySituation?: string;
        socioeconomicLevel?: string;
        housingType?: string;
        numberOfSiblings?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    uploadPhoto(id: string, file: Express.Multer.File, type: 'credencial' | 'cuerpo', peso?: number, talla?: number): Promise<StudentDocument>;
}
