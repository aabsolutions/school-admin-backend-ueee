import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsOptional() @IsEnum(['enrolled', 'withdrawn', 'transferred']) status?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsMongoId() cursoLectivoId?: string;
}
