import { Document, Types } from 'mongoose';
export type InstitucionDocument = Institucion & Document;
export declare class Institucion {
    nombre: string;
    codigoAMIE: string;
    distrito: string;
    provincia: string;
    canton: string;
    contacto: string;
    email: string;
    direccion: string;
    autoridad: Types.ObjectId;
    logotipo: string;
    periodoLectivoFuncional: string;
}
export declare const InstitucionSchema: import("mongoose").Schema<Institucion, import("mongoose").Model<Institucion, any, any, any, any, any, Institucion>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Institucion, Document<unknown, {}, Institucion, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    codigoAMIE?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    distrito?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    provincia?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    canton?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    contacto?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    direccion?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    autoridad?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    logotipo?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    periodoLectivoFuncional?: import("mongoose").SchemaDefinitionProperty<string, Institucion, Document<unknown, {}, Institucion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institucion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Institucion>;
