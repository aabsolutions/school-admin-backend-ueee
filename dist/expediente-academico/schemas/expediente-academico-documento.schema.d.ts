import { Document, Types } from 'mongoose';
export type ExpedienteAcademicoDocumentoDocument = ExpedienteAcademicoDocumento & Document;
export declare class ExpedienteAcademicoDocumento {
    expedienteId: Types.ObjectId;
    seccion: string;
    nombre: string;
    url: string;
    descripcion: string;
    creadoPor: string;
    fecha: Date;
}
export declare const ExpedienteAcademicoDocumentoSchema: import("mongoose").Schema<ExpedienteAcademicoDocumento, import("mongoose").Model<ExpedienteAcademicoDocumento, any, any, any, any, any, ExpedienteAcademicoDocumento>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    expedienteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    seccion?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    nombre?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    url?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    creadoPor?: import("mongoose").SchemaDefinitionProperty<string, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, ExpedienteAcademicoDocumento, Document<unknown, {}, ExpedienteAcademicoDocumento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExpedienteAcademicoDocumento & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ExpedienteAcademicoDocumento>;
