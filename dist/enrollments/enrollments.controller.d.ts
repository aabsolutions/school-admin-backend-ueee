import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
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
    findOne(id: Types.ObjectId): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    create(dto: CreateEnrollmentDto): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    update(id: Types.ObjectId, dto: UpdateEnrollmentDto): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    withdraw(id: Types.ObjectId): Promise<import("./schemas/enrollment.schema").EnrollmentDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
