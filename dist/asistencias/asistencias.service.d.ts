import { Model, Types } from 'mongoose';
import { AttendanceAssignment, AttendanceAssignmentDocument } from './schemas/attendance-assignment.schema';
import { AttendanceRecord, AttendanceRecordDocument } from './schemas/attendance-record.schema';
import { CursoLectivoDocument } from '../curso-lectivo/schemas/curso-lectivo.schema';
import { EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';
import { ParentDocument } from '../parents/schemas/parent.schema';
import { CommunicadosService } from '../communicados/communicados.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SaveAttendanceDto } from './dto/save-attendance.dto';
import { AttendanceQueryDto } from './dto/attendance-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class AsistenciasService {
    private readonly assignmentModel;
    private readonly recordModel;
    private readonly cursoLectivoModel;
    private readonly enrollmentModel;
    private readonly parentModel;
    private readonly communicadosService;
    constructor(assignmentModel: Model<AttendanceAssignmentDocument>, recordModel: Model<AttendanceRecordDocument>, cursoLectivoModel: Model<CursoLectivoDocument>, enrollmentModel: Model<EnrollmentDocument>, parentModel: Model<ParentDocument>, communicadosService: CommunicadosService);
    createAssignment(dto: CreateAssignmentDto): Promise<AttendanceAssignment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAllAssignments(query: PaginationQueryDto): Promise<{
        data: (AttendanceAssignment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    deleteAssignment(id: string): Promise<void>;
    getMyAssignment(userId: string): Promise<{
        students: Types.ObjectId[];
        userId: Types.ObjectId;
        cursoLectivoId: Types.ObjectId;
        cursoId: Types.ObjectId;
        isActive: boolean;
        _id: Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
    saveAttendance(dto: SaveAttendanceDto, takenByUserId: string): Promise<{
        record: import("mongoose").Document<unknown, {}, AttendanceRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        absentCount: number;
    }>;
    private createAbsenceCommunicados;
    getMyRecords(userId: string, query: AttendanceQueryDto): Promise<{
        data: (AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllRecords(query: AttendanceQueryDto): Promise<{
        data: (AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getConsolidated(cursoLectivoId: string, dateFrom?: string, dateTo?: string): Promise<{
        totalDays: number;
        totalStudents: number;
        totalPresences: any;
        totalAbsences: any;
        attendanceRate: number;
        students: any[];
    }>;
    getStudentHistory(studentId: string, query: AttendanceQueryDto): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getMyChildrenAttendance(parentUserId: string, query: AttendanceQueryDto): Promise<any[]>;
}
