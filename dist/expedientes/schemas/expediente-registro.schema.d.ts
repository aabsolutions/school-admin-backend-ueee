import { Document, Types } from 'mongoose';
export type ExpedienteRegistroDocument = ExpedienteRegistro & Document;
export declare class ExpedienteRegistro {
    expedienteId: Types.ObjectId;
    tipo: string;
    fecha: Date;
    descripcion: string;
    evidencias: string[];
    creadoPor: string;
}
export declare const ExpedienteRegistroSchema: import("mongoose").Schema<ExpedienteRegistro, import("mongoose").Model<ExpedienteRegistro, any, any, any, any, any, ExpedienteRegistro>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    expedienteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tipo?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    evidencias?: import("mongoose").SchemaDefinitionProperty<string[], ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    creadoPor?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteRegistro, Document<unknown, {}, ExpedienteRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ExpedienteRegistro>;
