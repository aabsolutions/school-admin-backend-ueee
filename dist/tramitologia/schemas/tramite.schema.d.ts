import { Document, Types } from 'mongoose';
import { RequiredAttachment, VariableConfig } from './plantilla.schema';
export type TramiteDocument = Tramite & Document;
export declare enum TramiteState {
    Pendiente = "pendiente",
    EnProceso = "en_proceso",
    Aprobado = "aprobado",
    Rechazado = "rechazado",
    Finalizado = "finalizado"
}
export declare class PlantillaSnapshot {
    plantillaId: Types.ObjectId;
    nombre: string;
    version: number;
    bodyHtml: string;
    variables: VariableConfig[];
    requiredAttachments: RequiredAttachment[];
    plantillaRespuestaId?: Types.ObjectId;
}
export declare class DatosRepresentante {
    nombre: string;
    dni: string;
    contacto: string;
}
export declare class FilledValue {
    key: string;
    value: unknown;
}
export declare class TramiteAttachment {
    name: string;
    url: string;
    mime: string;
    sizeBytes: number;
    uploadedAt: Date;
    uploadedBy: Types.ObjectId;
}
export declare class Tramite {
    codigo: string;
    plantilla: PlantillaSnapshot;
    solicitanteUserId: Types.ObjectId;
    solicitanteRole: string;
    operativoUserId?: Types.ObjectId;
    values: FilledValue[];
    attachments: TramiteAttachment[];
    renderedHtml: string;
    state: TramiteState;
    lastObservation?: string;
    closedAt?: Date;
    datosRepresentante?: DatosRepresentante;
    estudianteId?: Types.ObjectId;
    cursoNombre?: string;
    respuestaValues: FilledValue[];
    respuestaRenderedHtml: string;
    solicitudMembreteUrl?: string;
    respuestaMembreteUrl?: string;
    membreteConfig?: {
        topMm: number;
        bottomMm: number;
    };
    respuestaBodyOverrideHtml?: string;
}
export declare const DatosRepresentanteSchema: import("mongoose").Schema<DatosRepresentante, import("mongoose").Model<DatosRepresentante, any, any, any, any, any, DatosRepresentante>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DatosRepresentante, Document<unknown, {}, DatosRepresentante, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DatosRepresentante & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, DatosRepresentante, Document<unknown, {}, DatosRepresentante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DatosRepresentante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    dni?: import("mongoose").SchemaDefinitionProperty<string, DatosRepresentante, Document<unknown, {}, DatosRepresentante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DatosRepresentante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    contacto?: import("mongoose").SchemaDefinitionProperty<string, DatosRepresentante, Document<unknown, {}, DatosRepresentante, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DatosRepresentante & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DatosRepresentante>;
export declare const TramiteSchema: import("mongoose").Schema<Tramite, import("mongoose").Model<Tramite, any, any, any, any, any, Tramite>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tramite, Document<unknown, {}, Tramite, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    codigo?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    plantilla?: import("mongoose").SchemaDefinitionProperty<PlantillaSnapshot, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    solicitanteUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    solicitanteRole?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    operativoUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    values?: import("mongoose").SchemaDefinitionProperty<FilledValue[], Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    attachments?: import("mongoose").SchemaDefinitionProperty<TramiteAttachment[], Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    renderedHtml?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    state?: import("mongoose").SchemaDefinitionProperty<TramiteState, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastObservation?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    closedAt?: import("mongoose").SchemaDefinitionProperty<Date, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    datosRepresentante?: import("mongoose").SchemaDefinitionProperty<DatosRepresentante, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    estudianteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cursoNombre?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    respuestaValues?: import("mongoose").SchemaDefinitionProperty<FilledValue[], Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    respuestaRenderedHtml?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    solicitudMembreteUrl?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    respuestaMembreteUrl?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    membreteConfig?: import("mongoose").SchemaDefinitionProperty<{
        topMm: number;
        bottomMm: number;
    }, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    respuestaBodyOverrideHtml?: import("mongoose").SchemaDefinitionProperty<string, Tramite, Document<unknown, {}, Tramite, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tramite & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Tramite>;
