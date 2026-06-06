import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { StudentDocument } from '../students/schemas/student.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { BulkPreviewDto } from './dto/bulk-preview.dto';
import { BulkEnrollDto } from './dto/bulk-enroll.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class EnrollmentsService {
    private readonly enrollmentModel;
    private readonly studentModel;
    private readonly notificationsService;
    constructor(enrollmentModel: Model<EnrollmentDocument>, studentModel: Model<StudentDocument>, notificationsService: NotificationsService);
    findAll(query: PaginationQueryDto & {
        studentId?: string;
        cursoLectivoId?: string;
        status?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, EnrollmentDocument, {}, import("mongoose").DefaultSchemaOptions> & Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(id: string): Promise<EnrollmentDocument>;
    create(dto: CreateEnrollmentDto): Promise<EnrollmentDocument>;
    update(id: string, dto: UpdateEnrollmentDto): Promise<EnrollmentDocument>;
    withdraw(id: string): Promise<EnrollmentDocument>;
    remove(id: string): Promise<void>;
    bulkPreview(dto: BulkPreviewDto): Promise<{
        dni: string;
        studentId?: string;
        name?: string;
        status: "ready" | "already_enrolled" | "not_found";
    }[]>;
    bulkCreate(dto: BulkEnrollDto): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    getStats(): Promise<{
        cursoLectivoId: string;
        total: number;
        male: number;
        female: number;
    }[]>;
}
