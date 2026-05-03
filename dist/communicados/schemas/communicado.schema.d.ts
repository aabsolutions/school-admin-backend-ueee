import { Document, Types } from 'mongoose';
export type CommunicadoDocument = Communicado & Document;
export type CommunicadoStatus = 'sent' | 'received';
export declare class Communicado {
    teacherUserId: Types.ObjectId;
    teacherName: string;
    studentId: Types.ObjectId;
    studentName: string;
    parentId: Types.ObjectId;
    parentUserId: Types.ObjectId;
    subject: string;
    body: string;
    status: CommunicadoStatus;
    receivedAt?: Date;
}
export declare const CommunicadoSchema: import("mongoose").Schema<Communicado, import("mongoose").Model<Communicado, any, any, any, any, any, Communicado>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Communicado, Document<unknown, {}, Communicado, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    teacherUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    teacherName?: import("mongoose").SchemaDefinitionProperty<string, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    studentName?: import("mongoose").SchemaDefinitionProperty<string, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parentUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subject?: import("mongoose").SchemaDefinitionProperty<string, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    body?: import("mongoose").SchemaDefinitionProperty<string, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<CommunicadoStatus, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    receivedAt?: import("mongoose").SchemaDefinitionProperty<Date, Communicado, Document<unknown, {}, Communicado, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Communicado & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Communicado>;
