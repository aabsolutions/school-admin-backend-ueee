import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty() @IsString() studentId: string;
  @IsNotEmpty() @IsString() cursoLectivoId: string;
  @IsOptional() @IsEnum(['enrolled', 'withdrawn', 'transferred']) status?: string;
  @IsOptional() @IsString() notes?: string;
}
