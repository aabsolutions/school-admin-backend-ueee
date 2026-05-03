import { Document, Types } from 'mongoose';
export type DocumentalEstudianteDocument = DocumentalEstudiante & Document;
export declare class DocumentalEstudiante {
    studentId: Types.ObjectId;
    boleta2do: boolean;
    boleta3ro: boolean;
    boleta4to: boolean;
    boleta5to: boolean;
    boleta6to: boolean;
    boleta7mo: boolean;
    boleta8vo: boolean;
    boleta9no: boolean;
    boleta10mo: boolean;
    boleta1roBach: boolean;
    boleta2doBach: boolean;
    copiaCedulaEstudiante: boolean;
    copiaCedulaRepresentante: boolean;
    certificadoParticipacion: boolean;
    notas: string;
}
export declare const DocumentalEstudianteSchema: import("mongoose").Schema<DocumentalEstudiante, import("mongoose").Model<DocumentalEstudiante, any, any, any, any, any, DocumentalEstudiante>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta2do?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta3ro?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta4to?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta5to?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta6to?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta7mo?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta8vo?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta9no?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta10mo?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta1roBach?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    boleta2doBach?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    copiaCedulaEstudiante?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    copiaCedulaRepresentante?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    certificadoParticipacion?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    notas?: import("mongoose").SchemaDefinitionProperty<string, DocumentalEstudiante, Document<unknown, {}, DocumentalEstudiante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentalEstudiante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DocumentalEstudiante>;
