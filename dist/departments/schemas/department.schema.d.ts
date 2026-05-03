import { Document } from 'mongoose';
export type DepartmentDocument = Department & Document;
export declare class Department {
    departmentName: string;
    hodName: string;
    phone: string;
    email: string;
    studentCapacity: number;
    establishedYear: number;
    totalFaculty: number;
    description: string;
    isActive: boolean;
}
export declare const DepartmentSchema: import("mongoose").Schema<Department, import("mongoose").Model<Department, any, any, any, any, any, Department>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department, Document<unknown, {}, Department, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    departmentName?: import("mongoose").SchemaDefinitionProperty<string, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hodName?: import("mongoose").SchemaDefinitionProperty<string, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    studentCapacity?: import("mongoose").SchemaDefinitionProperty<number, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    establishedYear?: import("mongoose").SchemaDefinitionProperty<number, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    totalFaculty?: import("mongoose").SchemaDefinitionProperty<number, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Department, Document<unknown, {}, Department, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Department>;
