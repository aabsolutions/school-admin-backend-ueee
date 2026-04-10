import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeceRegistroDto {
  @IsNotEmpty()
  @IsEnum([
    'Seguimiento individual', 'Entrevista familiar', 'Crisis emocional',
    'Derivación externa', 'Taller grupal', 'Acompañamiento académico', 'Otro',
  ])
  tipo: string;

  @IsNotEmpty() @IsDateString() fecha: string;
  @IsNotEmpty() @IsString() descripcion: string;
  @IsOptional() @IsArray() @IsString({ each: true }) evidencias?: string[];
  @IsNotEmpty() @IsString() creadoPor: string;
}
