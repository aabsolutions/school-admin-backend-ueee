import { Document, Types } from 'mongoose';
export type EnrollmentDocument = Enrollment & Document;
export declare class Enrollment {
    studentId: Types.ObjectId;
    cursoLectivoId: Types.ObjectId;
    enrolledAt: Date;
    status: string;
    notes: string;
}
export declare const EnrollmentSchema: import("mongoose").Schema<Enrollment, import("mongoose").Model<Enrollment, any, any, any, any, any, Enrollment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enrollment, Document<unknown, {}, Enrollment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Enrollment, Document<unknown, {}, Enrollment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cursoLectivoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Enrollment, Document<unknown, {}, Enrollment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    enrolledAt?: import("mongoose").SchemaDefinitionProperty<Date, Enrollment, Document<unknown, {}, Enrollment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Enrollment, Document<unknown, {}, Enrollment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Enrollment, Document<unknown, {}, Enrollment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enrollment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Enrollment>;
