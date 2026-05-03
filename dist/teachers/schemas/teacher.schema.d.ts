import { Document, Types } from 'mongoose';
export type TeacherDocument = Teacher & Document;
export declare class TeacherMedicalInfo {
    bloodType: string;
    hasAllergies: boolean;
    allergiesDetail: string;
    hasChronicCondition: boolean;
    chronicConditionDetail: string;
    currentMedications: string;
    hasDisability: boolean;
    disabilityDetail: string;
    hasConadis: boolean;
    conadisNumber: string;
    healthInsurance: string;
    policyNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    medicalNotes: string;
}
export declare const TeacherMedicalInfoSchema: import("mongoose").Schema<TeacherMedicalInfo, import("mongoose").Model<TeacherMedicalInfo, any, any, any, any, any, TeacherMedicalInfo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    bloodType?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasAllergies?: import("mongoose").SchemaDefinitionProperty<boolean, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    allergiesDetail?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasChronicCondition?: import("mongoose").SchemaDefinitionProperty<boolean, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    chronicConditionDetail?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentMedications?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasDisability?: import("mongoose").SchemaDefinitionProperty<boolean, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    disabilityDetail?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasConadis?: import("mongoose").SchemaDefinitionProperty<boolean, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    conadisNumber?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    healthInsurance?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    policyNumber?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactName?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactPhone?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactRelation?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    medicalNotes?: import("mongoose").SchemaDefinitionProperty<string, TeacherMedicalInfo, Document<unknown, {}, TeacherMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, TeacherMedicalInfo>;
export declare class TeacherFamilyInfo {
    maritalStatus: string;
    spouseName: string;
    spouseOccupation: string;
    spouseMobile: string;
    numberOfChildren: number;
    childrenAges: string;
    housingType: string;
    familyNotes: string;
}
export declare const TeacherFamilyInfoSchema: import("mongoose").Schema<TeacherFamilyInfo, import("mongoose").Model<TeacherFamilyInfo, any, any, any, any, any, TeacherFamilyInfo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    maritalStatus?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    spouseName?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    spouseOccupation?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    spouseMobile?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    numberOfChildren?: import("mongoose").SchemaDefinitionProperty<number, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    childrenAges?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    housingType?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    familyNotes?: import("mongoose").SchemaDefinitionProperty<string, TeacherFamilyInfo, Document<unknown, {}, TeacherFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeacherFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, TeacherFamilyInfo>;
export declare class Teacher {
    userId: Types.ObjectId;
    img: string;
    imgCuerpoEntero: string;
    peso: number;
    talla: number;
    name: string;
    email: string;
    dni: string;
    gender: string;
    mobile: string;
    laboralDependency: string;
    salarialCategory: string;
    emergencyName: string;
    emergencyMobile: string;
    departmentId: Types.ObjectId;
    areaEstudioId: Types.ObjectId;
    address: string;
    subjectSpecialization: string;
    experienceYears: number;
    status: string;
    birthdate: Date;
    bio: string;
    medicalInfo: TeacherMedicalInfo;
    familyInfo: TeacherFamilyInfo;
}
export declare const TeacherSchema: import("mongoose").Schema<Teacher, import("mongoose").Model<Teacher, any, any, any, any, any, Teacher>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Teacher, Document<unknown, {}, Teacher, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    img?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    imgCuerpoEntero?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    peso?: import("mongoose").SchemaDefinitionProperty<number, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    talla?: import("mongoose").SchemaDefinitionProperty<number, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    dni?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    gender?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mobile?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    laboralDependency?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    salarialCategory?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyName?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyMobile?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    departmentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    areaEstudioId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subjectSpecialization?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    experienceYears?: import("mongoose").SchemaDefinitionProperty<number, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    birthdate?: import("mongoose").SchemaDefinitionProperty<Date, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bio?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    medicalInfo?: import("mongoose").SchemaDefinitionProperty<TeacherMedicalInfo, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    familyInfo?: import("mongoose").SchemaDefinitionProperty<TeacherFamilyInfo, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Teacher>;
