export declare class FilledValueDto {
    key: string;
    value: unknown;
}
export declare class DatosRepresentanteDto {
    nombre?: string;
    dni?: string;
    contacto?: string;
}
export declare class CreateTramiteDto {
    plantillaId: string;
    operativoUserId?: string;
    values?: FilledValueDto[];
    datosRepresentante?: DatosRepresentanteDto;
    estudianteId?: string;
    cursoNombre?: string;
}
