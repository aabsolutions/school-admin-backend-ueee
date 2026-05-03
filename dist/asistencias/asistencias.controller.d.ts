import { Types } from 'mongoose';
import { AsistenciasService } from './asistencias.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SaveAttendanceDto } from './dto/save-attendance.dto';
import { AttendanceQueryDto } from './dto/attendance-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class AsistenciasController {
    private readonly asistenciasService;
    constructor(asistenciasService: AsistenciasService);
    createAssignment(dto: CreateAssignmentDto): Promise<import("./schemas/attendance-assignment.schema").AttendanceAssignment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAllAssignments(query: PaginationQueryDto): Promise<{
        data: (import("./schemas/attendance-assignment.schema").AttendanceAssignment & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getMyAssignment(user: any): Promise<{
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
    deleteAssignment(id: Types.ObjectId): Promise<void>;
    saveAttendance(dto: SaveAttendanceDto, user: any): Promise<{
        record: import("mongoose").Document<unknown, {}, import("./schemas/attendance-record.schema").AttendanceRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/attendance-record.schema").AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        absentCount: number;
    }>;
    getMyRecords(user: any, query: AttendanceQueryDto): Promise<{
        data: (import("./schemas/attendance-record.schema").AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    getMyChildrenAttendance(user: any, query: AttendanceQueryDto): Promise<any[]>;
    getStudentHistory(id: Types.ObjectId, query: AttendanceQueryDto): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllRecords(query: AttendanceQueryDto): Promise<{
        data: (import("./schemas/attendance-record.schema").AttendanceRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
