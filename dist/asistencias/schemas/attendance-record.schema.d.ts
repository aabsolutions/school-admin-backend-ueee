import { Document, Types } from 'mongoose';
export type AttendanceRecordDocument = AttendanceRecord & Document;
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export declare class AttendanceEntry {
    studentId: Types.ObjectId;
    status: AttendanceStatus;
    note: string;
}
export declare const AttendanceEntrySchema: import("mongoose").Schema<AttendanceEntry, import("mongoose").Model<AttendanceEntry, any, any, any, any, any, AttendanceEntry>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttendanceEntry, Document<unknown, {}, AttendanceEntry, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceEntry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceEntry, Document<unknown, {}, AttendanceEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<AttendanceStatus, AttendanceEntry, Document<unknown, {}, AttendanceEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    note?: import("mongoose").SchemaDefinitionProperty<string, AttendanceEntry, Document<unknown, {}, AttendanceEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, AttendanceEntry>;
export declare class AttendanceRecord {
    cursoLectivoId: Types.ObjectId;
    cursoId: Types.ObjectId;
    date: Date;
    takenByUserId: Types.ObjectId;
    records: AttendanceEntry[];
}
export declare const AttendanceRecordSchema: import("mongoose").Schema<AttendanceRecord, import("mongoose").Model<AttendanceRecord, any, any, any, any, any, AttendanceRecord>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    cursoLectivoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cursoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    date?: import("mongoose").SchemaDefinitionProperty<Date, AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    takenByUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    records?: import("mongoose").SchemaDefinitionProperty<AttendanceEntry[], AttendanceRecord, Document<unknown, {}, AttendanceRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttendanceRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, AttendanceRecord>;
