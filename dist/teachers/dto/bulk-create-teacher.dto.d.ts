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
    salarialCategory?: string;
    emergencyName?: string;
    emergencyMobile?: string;
    bio?: string;
    status?: string;
}
export declare class BulkCreateTeacherDto {
    records: BulkTeacherItemDto[];
}
