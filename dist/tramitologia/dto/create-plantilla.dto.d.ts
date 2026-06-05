export declare class VariableConfigDto {
    key: string;
    label: string;
    fieldType: string;
    required: boolean;
    options: string[];
    defaultValue?: string;
    placeholder?: string;
    order: number;
}
export declare class RequiredAttachmentDto {
    name: string;
    description?: string;
    required: boolean;
    allowedMimes: string[];
    maxSizeBytes: number;
}
export declare class CreatePlantillaDto {
    nombre: string;
    descripcion?: string;
    categoria: string;
    tipo?: string;
    solicitanteRoles?: string[];
    bodyHtml: string;
    variables?: VariableConfigDto[];
    requiredAttachments?: RequiredAttachmentDto[];
    plantillaRespuestaId?: string | null;
}
