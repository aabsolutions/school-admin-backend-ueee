import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateStudentMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateStudentFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateStudentGeneralDto } from './dto/update-student-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getMe(user: any): Promise<import("./schemas/student.schema").StudentDocument>;
    updateMyGeneral(user: any, dto: UpdateStudentGeneralDto): Promise<import("./schemas/student.schema").StudentDocument>;
    updateMyMedical(user: any, dto: UpdateStudentMedicalInfoDto): Promise<import("./schemas/student.schema").StudentDocument>;
    updateMyFamily(user: any, dto: UpdateStudentFamilyInfoDto): Promise<import("./schemas/student.schema").StudentDocument>;
    getReporteMedico(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student.schema").Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(query: PaginationQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/student.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student.schema").Student & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/student.schema").StudentDocument>;
    create(dto: CreateStudentDto): Promise<import("./schemas/student.schema").StudentDocument>;
    update(id: Types.ObjectId, dto: UpdateStudentDto): Promise<import("./schemas/student.schema").StudentDocument>;
    toggleStatus(id: Types.ObjectId, status: string): Promise<import("./schemas/student.schema").StudentDocument>;
    updateMedical(id: Types.ObjectId, dto: UpdateStudentMedicalInfoDto): Promise<import("./schemas/student.schema").StudentDocument>;
    updateFamily(id: Types.ObjectId, dto: UpdateStudentFamilyInfoDto): Promise<import("./schemas/student.schema").StudentDocument>;
    remove(id: Types.ObjectId): Promise<void>;
    uploadPhoto(id: Types.ObjectId, file: Express.Multer.File, type: 'credencial' | 'cuerpo', peso?: string, talla?: string): Promise<import("./schemas/student.schema").StudentDocument>;
}
