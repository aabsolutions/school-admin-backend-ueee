import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoLectivoDto {
  @IsNotEmpty() @IsString() cursoId: string;
  @IsNotEmpty() @IsString() academicYear: string;
  @IsOptional() @IsString() tutorId?: string;
  @IsOptional() @IsString() inspectorId?: string;
  @IsOptional() @IsString() psicologoId?: string;
  @IsOptional() @IsEnum(['active', 'inactive', 'closed']) status?: string;
}
