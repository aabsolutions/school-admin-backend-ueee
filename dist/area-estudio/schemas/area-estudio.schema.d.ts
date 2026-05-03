import { Document } from 'mongoose';
export type AreaEstudioDocument = AreaEstudio & Document;
export declare class AreaEstudio {
    nombre: string;
    descripcion: string;
    isActive: boolean;
}
export declare const AreaEstudioSchema: import("mongoose").Schema<AreaEstudio, import("mongoose").Model<AreaEstudio, any, any, any, any, any, AreaEstudio>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AreaEstudio, Document<unknown, {}, AreaEstudio, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AreaEstudio & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, AreaEstudio, Document<unknown, {}, AreaEstudio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AreaEstudio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, AreaEstudio, Document<unknown, {}, AreaEstudio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AreaEstudio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AreaEstudio, Document<unknown, {}, AreaEstudio, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AreaEstudio & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, AreaEstudio>;
