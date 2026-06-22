export declare class BulkTeacherItemDto {
    name: string;
    dni: string;
    email?: string;
    mobile?: string;
    gender?: string;
    birthdate?: string;
    address?: string;
    subjectSpecialization?: string;
    experienceYears?: number;
    laboralDependency?: string;
    jornadaLaboral?: string;
    correoInstitucional?: string;
    salarialCategory?: string;
    emergencyName?: string;
    emergencyMobile?: string;
    bio?: string;
    status?: string;
    peso?: number;
    talla?: number;
    bloodType?: string;
    hasAllergies?: boolean;
    allergiesDetail?: string;
    hasChronicCondition?: boolean;
    chronicConditionDetail?: string;
    currentMedications?: string;
    hasDisability?: boolean;
    disabilityDetail?: string;
    hasConadis?: boolean;
    conadisNumber?: string;
    healthInsurance?: string;
    policyNumber?: string;
    maritalStatus?: string;
    spouseName?: string;
    spouseOccupation?: string;
    spouseMobile?: string;
    numberOfChildren?: number;
    childrenAges?: string;
    housingType?: string;
}
export declare class BulkCreateTeacherDto {
    records: BulkTeacherItemDto[];
}
