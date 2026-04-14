import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsOptional() @IsString() codigo?: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
}
