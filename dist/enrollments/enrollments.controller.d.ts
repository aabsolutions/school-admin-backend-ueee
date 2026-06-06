import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { BulkPreviewDto } from './dto/bulk-preview.dto';
import { BulkEnrollDto } from './dto/bulk-enroll.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { Types } from 'mongoose';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    findAll(query: EnrollmentQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/enrollment.schema").EnrollmentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/enrollment.schema").Enrollment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getStats(): Promise<{
        cursoLectivoId: string;
        total: number;
        male: number;
        female: number;
    }[]>;
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    create(dto: CreateEnrollmentDto): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    update(id: Types.ObjectId, dto: UpdateEnrollmentDto): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    withdraw(id: Types.ObjectId): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
