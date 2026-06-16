import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateExpedienteAcademicoDocumentoDto {
  @IsNotEmpty() @IsString() seccion: string;
  @IsNotEmpty() @IsString() nombre: string;
  @IsNotEmpty() @IsString() url: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsNotEmpty() @IsString() creadoPor: string;
  @IsOptional() @IsDateString() fecha?: string;
}
