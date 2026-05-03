import { Document, Types } from 'mongoose';
export type CargaHorariaDocument = CargaHoraria & Document;
export declare class CargaHoraria {
    cursoLectivoId: Types.ObjectId;
    materiaId: Types.ObjectId;
    docenteId: Types.ObjectId;
}
export declare const CargaHorariaSchema: import("mongoose").Schema<CargaHoraria, import("mongoose").Model<CargaHoraria, any, any, any, any, any, CargaHoraria>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CargaHoraria, Document<unknown, {}, CargaHoraria, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CargaHoraria & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    cursoLectivoId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CargaHoraria, Document<unknown, {}, CargaHoraria, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CargaHoraria & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    materiaId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CargaHoraria, Document<unknown, {}, CargaHoraria, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CargaHoraria & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    docenteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CargaHoraria, Document<unknown, {}, CargaHoraria, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CargaHoraria & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, CargaHoraria>;
