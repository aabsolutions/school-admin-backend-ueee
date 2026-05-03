import { Document, Types } from 'mongoose';
export type DeceExpedienteDocument = DeceExpediente & Document;
export declare class DeceExpediente {
    studentId: Types.ObjectId;
    notas: string;
    status: string;
}
export declare const DeceExpedienteSchema: import("mongoose").Schema<DeceExpediente, import("mongoose").Model<DeceExpediente, any, any, any, any, any, DeceExpediente>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeceExpediente, Document<unknown, {}, DeceExpediente, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DeceExpediente & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DeceExpediente, Document<unknown, {}, DeceExpediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceExpediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notas?: import("mongoose").SchemaDefinitionProperty<string, DeceExpediente, Document<unknown, {}, DeceExpediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceExpediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, DeceExpediente, Document<unknown, {}, DeceExpediente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceExpediente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DeceExpediente>;
