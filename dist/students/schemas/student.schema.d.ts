import { Document, Types } from 'mongoose';
export type StudentDocument = Student & Document;
export declare class StudentMedicalInfo {
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
    doctorName: string;
    doctorPhone: string;
    healthInsurance: string;
    policyNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    medicalNotes: string;
}
export declare const StudentMedicalInfoSchema: import("mongoose").Schema<StudentMedicalInfo, import("mongoose").Model<StudentMedicalInfo, any, any, any, any, any, StudentMedicalInfo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    bloodType?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasAllergies?: import("mongoose").SchemaDefinitionProperty<boolean, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    allergiesDetail?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasChronicCondition?: import("mongoose").SchemaDefinitionProperty<boolean, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    chronicConditionDetail?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentMedications?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasDisability?: import("mongoose").SchemaDefinitionProperty<boolean, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    disabilityDetail?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    hasConadis?: import("mongoose").SchemaDefinitionProperty<boolean, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    conadisNumber?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    doctorName?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    doctorPhone?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    healthInsurance?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    policyNumber?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactName?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactPhone?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyContactRelation?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    medicalNotes?: import("mongoose").SchemaDefinitionProperty<string, StudentMedicalInfo, Document<unknown, {}, StudentMedicalInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentMedicalInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, StudentMedicalInfo>;
export declare class StudentFamilyInfo {
    familySituation: string;
    livesWithWhom: string;
    fatherOccupation: string;
    fatherEducationLevel: string;
    motherOccupation: string;
    motherEducationLevel: string;
    numberOfSiblings: number;
    studentBirthOrder: number;
    socioeconomicLevel: string;
    housingType: string;
    familyNotes: string;
}
export declare const StudentFamilyInfoSchema: import("mongoose").Schema<StudentFamilyInfo, import("mongoose").Model<StudentFamilyInfo, any, any, any, any, any, StudentFamilyInfo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    familySituation?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    livesWithWhom?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fatherOccupation?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fatherEducationLevel?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    motherOccupation?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    motherEducationLevel?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    numberOfSiblings?: import("mongoose").SchemaDefinitionProperty<number, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    studentBirthOrder?: import("mongoose").SchemaDefinitionProperty<number, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    socioeconomicLevel?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    housingType?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    familyNotes?: import("mongoose").SchemaDefinitionProperty<string, StudentFamilyInfo, Document<unknown, {}, StudentFamilyInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentFamilyInfo & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, StudentFamilyInfo>;
export declare class Student {
    userId: Types.ObjectId;
    img: string;
    imgCuerpoEntero: string;
    peso: number;
    talla: number;
    name: string;
    email: string;
    dni: string;
    mobile: string;
    gender: string;
    residenceZone: string;
    birthdate: Date;
    address: string;
    parentGuardianName: string;
    parentGuardianMobile: string;
    fatherName: string;
    fatherMobile: string;
    motherName: string;
    motherMobile: string;
    status: string;
    medicalInfo: StudentMedicalInfo;
    familyInfo: StudentFamilyInfo;
    fatherId: Types.ObjectId | null;
    motherId: Types.ObjectId | null;
    guardianId: Types.ObjectId | null;
    parentIds: Types.ObjectId[];
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, any, any, Student>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, Student, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    img?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    imgCuerpoEntero?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    peso?: import("mongoose").SchemaDefinitionProperty<number, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    talla?: import("mongoose").SchemaDefinitionProperty<number, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    dni?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    mobile?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    gender?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    residenceZone?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    birthdate?: import("mongoose").SchemaDefinitionProperty<Date, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parentGuardianName?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parentGuardianMobile?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fatherName?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fatherMobile?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    motherName?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    motherMobile?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    medicalInfo?: import("mongoose").SchemaDefinitionProperty<StudentMedicalInfo, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    familyInfo?: import("mongoose").SchemaDefinitionProperty<StudentFamilyInfo, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fatherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    motherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    guardianId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parentIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Student>;
