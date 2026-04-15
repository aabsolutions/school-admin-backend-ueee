import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsOptional() @IsString() codigo?: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsNumber() @Min(0) horas?: number;
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
}
