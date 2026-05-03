import { Document, Types } from 'mongoose';
export type ParentDocument = Parent & Document;
export declare class Parent {
    userId: Types.ObjectId;
    name: string;
    email: string;
    dni: string;
    mobile: string;
    gender: string;
    address: string;
    occupation: string;
    educationLevel: string;
    studentIds: Types.ObjectId[];
    isActive: boolean;
}
export declare const ParentSchema: import("mongoose").Schema<Parent, import("mongoose").Model<Parent, any, any, any, any, any, Parent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Parent, Document<unknown, {}, Parent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    dni?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mobile?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    gender?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    occupation?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    educationLevel?: import("mongoose").SchemaDefinitionProperty<string, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    studentIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Parent, Document<unknown, {}, Parent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Parent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Parent>;
