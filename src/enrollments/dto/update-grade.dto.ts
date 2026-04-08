import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateGradeDto {
  @IsNotEmpty() @IsEnum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'I', 'W']) grade: string;
  @IsOptional() @IsNumber() gradePoints?: number;
}
