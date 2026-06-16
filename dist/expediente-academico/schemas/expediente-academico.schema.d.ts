import { Document, Types } from 'mongoose';
export type ExpedienteAcademicoDocument = ExpedienteAcademico & Document;
export declare class ExpedienteAcademico {
    studentId: Types.ObjectId;
}
export declare const ExpedienteAcademicoSchema: import("mongoose").Schema<ExpedienteAcademico, import("mongoose").Model<ExpedienteAcademico, any, any, any, any, any, ExpedienteAcademico>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExpedienteAcademico, Document<unknown, {}, ExpedienteAcademico, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademico & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ExpedienteAcademico, Document<unknown, {}, ExpedienteAcademico, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademico & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ExpedienteAcademico>;
