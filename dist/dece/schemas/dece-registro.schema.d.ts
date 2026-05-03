import { Document, Types } from 'mongoose';
export type DeceRegistroDocument = DeceRegistro & Document;
export declare class DeceRegistro {
    expedienteId: Types.ObjectId;
    tipo: string;
    fecha: Date;
    descripcion: string;
    evidencias: string[];
    creadoPor: string;
}
export declare const DeceRegistroSchema: import("mongoose").Schema<DeceRegistro, import("mongoose").Model<DeceRegistro, any, any, any, any, any, DeceRegistro>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeceRegistro, Document<unknown, {}, DeceRegistro, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    expedienteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tipo?: import("mongoose").SchemaDefinitionProperty<string, DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    evidencias?: import("mongoose").SchemaDefinitionProperty<string[], DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    creadoPor?: import("mongoose").SchemaDefinitionProperty<string, DeceRegistro, Document<unknown, {}, DeceRegistro, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DeceRegistro & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DeceRegistro>;
