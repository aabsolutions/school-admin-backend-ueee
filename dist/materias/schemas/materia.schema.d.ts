import { Document } from 'mongoose';
export type MateriaDocument = Materia & Document;
export declare class Materia {
    nombre: string;
    codigo: string;
    descripcion: string;
    horas: number;
    status: string;
}
export declare const MateriaSchema: import("mongoose").Schema<Materia, import("mongoose").Model<Materia, any, any, any, any, any, Materia>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Materia, Document<unknown, {}, Materia, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, Materia, Document<unknown, {}, Materia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    codigo?: import("mongoose").SchemaDefinitionProperty<string, Materia, Document<unknown, {}, Materia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, Materia, Document<unknown, {}, Materia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    horas?: import("mongoose").SchemaDefinitionProperty<number, Materia, Document<unknown, {}, Materia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Materia, Document<unknown, {}, Materia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Materia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Materia>;
