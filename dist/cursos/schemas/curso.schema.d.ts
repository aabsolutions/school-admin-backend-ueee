import { Document, Types } from 'mongoose';
export type CursoDocument = Curso & Document;
export declare class Curso {
    nivel: string;
    especialidad: string;
    paralelo: string;
    jornada: string;
    subnivel: string;
    status: string;
    materias: Types.ObjectId[];
}
export declare const CursoSchema: import("mongoose").Schema<Curso, import("mongoose").Model<Curso, any, any, any, any, any, Curso>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Curso, Document<unknown, {}, Curso, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nivel?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    especialidad?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paralelo?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    jornada?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subnivel?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    materias?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Curso, Document<unknown, {}, Curso, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Curso & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Curso>;
