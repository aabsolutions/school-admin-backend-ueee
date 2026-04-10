import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpedienteRegistroDto {
  @IsNotEmpty()
  @IsEnum(['Reunión', 'Indisciplina', 'Permiso', 'Atraso', 'Acuerdo', 'Llamado de atención', 'Otro'])
  tipo: string;

  @IsNotEmpty() @IsDateString() fecha: string;

  @IsNotEmpty() @IsString() descripcion: string;

  @IsOptional() @IsArray() @IsString({ each: true }) evidencias?: string[];

  @IsNotEmpty() @IsString() creadoPor: string;
}
