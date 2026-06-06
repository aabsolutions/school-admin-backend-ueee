export declare class BulkParentItemDto {
    name: string;
    email: string;
    dni?: string;
    mobile?: string;
    gender?: string;
    address?: string;
    occupation?: string;
    educationLevel?: string;
    username?: string;
    password?: string;
}
export declare class BulkCreateParentDto {
    records: BulkParentItemDto[];
}
export interface BulkParentImportResult {
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
