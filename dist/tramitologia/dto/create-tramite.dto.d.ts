export declare class FilledValueDto {
    key: string;
    value: unknown;
}
export declare class CreateTramiteDto {
    plantillaId: string;
    operativoUserId?: string;
    values?: FilledValueDto[];
}
