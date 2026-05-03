import { Document, Types } from 'mongoose';
export type CursoLectivoDocument = CursoLectivo & Document;
export declare class CursoLectivo {
    cursoId: Types.ObjectId;
    academicYear: string;
    tutorId: Types.ObjectId;
    inspectorId: Types.ObjectId;
    psicologoId: Types.ObjectId;
    status: string;
}
export declare const CursoLectivoSchema: import("mongoose").Schema<CursoLectivo, import("mongoose").Model<CursoLectivo, any, any, any, any, any, CursoLectivo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CursoLectivo, Document<unknown, {}, CursoLectivo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    cursoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    academicYear?: import("mongoose").SchemaDefinitionProperty<string, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tutorId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    inspectorId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    psicologoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, CursoLectivo, Document<unknown, {}, CursoLectivo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CursoLectivo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, CursoLectivo>;
