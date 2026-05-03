import { Document, Types } from 'mongoose';
export type ClassSectionDocument = ClassSection & Document;
export declare class ClassSection {
    className: string;
    classCode: string;
    courseId: Types.ObjectId;
    teacherId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    roomNumber: string;
    schedule: string;
    semester: string;
    academicYear: string;
    classCapacity: number;
    status: string;
    classType: string;
}
export declare const ClassSectionSchema: import("mongoose").Schema<ClassSection, import("mongoose").Model<ClassSection, any, any, any, any, any, ClassSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClassSection, Document<unknown, {}, ClassSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    className?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    classCode?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    courseId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    teacherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    roomNumber?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    schedule?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    semester?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    academicYear?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    classCapacity?: import("mongoose").SchemaDefinitionProperty<number, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    classType?: import("mongoose").SchemaDefinitionProperty<string, ClassSection, Document<unknown, {}, ClassSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassSection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ClassSection>;
