import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, Allow, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class FilledValueDto {
  @IsString() @IsNotEmpty() key: string;
  @Allow() value: unknown;
}

export class DatosRepresentanteDto {
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() dni?: string;
  @IsOptional() @IsString() contacto?: string;
}

export class CreateTramiteDto {
  @IsString() @IsNotEmpty() plantillaId: string;

  @IsOptional() @IsString() operativoUserId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilledValueDto)
  values?: FilledValueDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DatosRepresentanteDto)
  datosRepresentante?: DatosRepresentanteDto;

  @IsOptional() @IsMongoId() estudianteId?: string;
  @IsOptional() @IsString() cursoNombre?: string;
}
