import { Document, Types } from 'mongoose';
export type PlantillaDocument = Plantilla & Document;
export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email';
export declare class VariableConfig {
    key: string;
    label: string;
    fieldType: FieldType;
    required: boolean;
    options: string[];
    defaultValue?: string;
    placeholder?: string;
    order: number;
}
export declare class RequiredAttachment {
    name: string;
    description: string;
    required: boolean;
    allowedMimes: string[];
    maxSizeBytes: number;
}
export declare class Plantilla {
    nombre: string;
    descripcion: string;
    categoria: string;
    tipo: string;
    solicitanteRoles: string[];
    bodyHtml: string;
    variables: VariableConfig[];
    requiredAttachments: RequiredAttachment[];
    isActive: boolean;
    version: number;
    createdBy: Types.ObjectId;
    plantillaRespuestaId?: Types.ObjectId;
}
export declare const VariableConfigSchema: import("mongoose").Schema<VariableConfig, import("mongoose").Model<VariableConfig, any, any, any, any, any, VariableConfig>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VariableConfig, Document<unknown, {}, VariableConfig, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    key?: import("mongoose").SchemaDefinitionProperty<string, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    label?: import("mongoose").SchemaDefinitionProperty<string, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fieldType?: import("mongoose").SchemaDefinitionProperty<FieldType, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    required?: import("mongoose").SchemaDefinitionProperty<boolean, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    options?: import("mongoose").SchemaDefinitionProperty<string[], VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    defaultValue?: import("mongoose").SchemaDefinitionProperty<string, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    placeholder?: import("mongoose").SchemaDefinitionProperty<string, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    order?: import("mongoose").SchemaDefinitionProperty<number, VariableConfig, Document<unknown, {}, VariableConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VariableConfig & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, VariableConfig>;
export declare const RequiredAttachmentSchema: import("mongoose").Schema<RequiredAttachment, import("mongoose").Model<RequiredAttachment, any, any, any, any, any, RequiredAttachment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    required?: import("mongoose").SchemaDefinitionProperty<boolean, RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    allowedMimes?: import("mongoose").SchemaDefinitionProperty<string[], RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    maxSizeBytes?: import("mongoose").SchemaDefinitionProperty<number, RequiredAttachment, Document<unknown, {}, RequiredAttachment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RequiredAttachment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, RequiredAttachment>;
export declare const PlantillaSchema: import("mongoose").Schema<Plantilla, import("mongoose").Model<Plantilla, any, any, any, any, any, Plantilla>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Plantilla, Document<unknown, {}, Plantilla, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    categoria?: import("mongoose").SchemaDefinitionProperty<string, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tipo?: import("mongoose").SchemaDefinitionProperty<string, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    solicitanteRoles?: import("mongoose").SchemaDefinitionProperty<string[], Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bodyHtml?: import("mongoose").SchemaDefinitionProperty<string, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    variables?: import("mongoose").SchemaDefinitionProperty<VariableConfig[], Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    requiredAttachments?: import("mongoose").SchemaDefinitionProperty<RequiredAttachment[], Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    version?: import("mongoose").SchemaDefinitionProperty<number, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    plantillaRespuestaId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Plantilla, Document<unknown, {}, Plantilla, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Plantilla & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Plantilla>;
