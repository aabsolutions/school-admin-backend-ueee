import { Document, Types } from 'mongoose';
export type DocumentalDocenteDocument = DocumentalDocente & Document;
export declare class DocumentoItem {
    nombre: string;
    url: string;
    categoria: string;
    descripcion: string;
    fecha: Date;
}
export declare const DocumentoItemSchema: import("mongoose").Schema<DocumentoItem, import("mongoose").Model<DocumentoItem, any, any, any, any, any, DocumentoItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentoItem, Document<unknown, {}, DocumentoItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, DocumentoItem, Document<unknown, {}, DocumentoItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    url?: import("mongoose").SchemaDefinitionProperty<string, DocumentoItem, Document<unknown, {}, DocumentoItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    categoria?: import("mongoose").SchemaDefinitionProperty<string, DocumentoItem, Document<unknown, {}, DocumentoItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, DocumentoItem, Document<unknown, {}, DocumentoItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, DocumentoItem, Document<unknown, {}, DocumentoItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentoItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DocumentoItem>;
export declare class DocumentalDocente {
    teacherId: Types.ObjectId;
    documentos: DocumentoItem[];
}
export declare const DocumentalDocenteSchema: import("mongoose").Schema<DocumentalDocente, import("mongoose").Model<DocumentalDocente, any, any, any, any, any, DocumentalDocente>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentalDocente, Document<unknown, {}, DocumentalDocente, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalDocente & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    teacherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentalDocente, Document<unknown, {}, DocumentalDocente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalDocente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    documentos?: import("mongoose").SchemaDefinitionProperty<DocumentoItem[], DocumentalDocente, Document<unknown, {}, DocumentalDocente, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalDocente & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DocumentalDocente>;
