import { Document, Types } from 'mongoose';
export type ExpedienteDocument = Expediente & Document;
export declare class Expediente {
    studentId: Types.ObjectId;
    notas: string;
    status: string;
}
export declare const ExpedienteSchema: import("mongoose").Schema<Expediente, import("mongoose").Model<Expediente, any, any, any, any, any, Expediente>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Expediente, Document<unknown, {}, Expediente, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Expediente & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Expediente, Document<unknown, {}, Expediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Expediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notas?: import("mongoose").SchemaDefinitionProperty<string, Expediente, Document<unknown, {}, Expediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Expediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Expediente, Document<unknown, {}, Expediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Expediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Expediente>;
