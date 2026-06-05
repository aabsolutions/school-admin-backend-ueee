export declare class BulkStudentItemDto {
    name: string;
    dni: string;
    email?: string;
    mobile?: string;
    gender?: string;
    residenceZone?: string;
    birthdate?: string;
    address?: string;
    parentGuardianName?: string;
    parentGuardianMobile?: string;
    fatherName?: string;
    fatherMobile?: string;
    motherName?: string;
    motherMobile?: string;
    status?: string;
}
export declare class BulkCreateStudentDto {
    records: BulkStudentItemDto[];
}
export interface BulkImportResult {
    total: number;
    successCount: number;
    failureCount: number;
    created: any[];
    failed: {
        row: number;
        data: any;
        error: string;
    }[];
}
