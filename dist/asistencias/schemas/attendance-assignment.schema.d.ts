import { Document, Types } from 'mongoose';
export type AttendanceAssignmentDocument = AttendanceAssignment & Document;
export declare class AttendanceAssignment {
    userId: Types.ObjectId;
    cursoLectivoId: Types.ObjectId;
    cursoId: Types.ObjectId;
    isActive: boolean;
}
export declare const AttendanceAssignmentSchema: import("mongoose").Schema<AttendanceAssignment, import("mongoose").Model<AttendanceAssignment, any, any, any, any, any, AttendanceAssignment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttendanceAssignment, Document<unknown, {}, AttendanceAssignment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceAssignment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceAssignment, Document<unknown, {}, AttendanceAssignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceAssignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cursoLectivoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceAssignment, Document<unknown, {}, AttendanceAssignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceAssignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cursoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceAssignment, Document<unknown, {}, AttendanceAssignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceAssignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AttendanceAssignment, Document<unknown, {}, AttendanceAssignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceAssignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, AttendanceAssignment>;
