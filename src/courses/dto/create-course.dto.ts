import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty() @IsString() courseCode: string;
  @IsNotEmpty() @IsString() courseName: string;
  @IsNotEmpty() @IsString() departmentId: string;
  @IsNotEmpty() @IsNumber() @Min(1) @Max(6) credits: number;

  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() durationWeeks?: number;
  @IsOptional() @IsBoolean() isElective?: boolean;
  @IsOptional() @IsEnum(['active', 'inactive', 'archived']) status?: string;
}
