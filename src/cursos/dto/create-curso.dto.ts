import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty() @IsString() nivel: string;
  @IsNotEmpty() @IsString() especialidad: string;
  @IsNotEmpty() @IsString() paralelo: string;
  @IsNotEmpty() @IsEnum(['Matutina', 'Vespertina', 'Nocturna']) jornada: string;
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
}
