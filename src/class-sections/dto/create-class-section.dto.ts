import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateClassSectionDto {
  @IsNotEmpty() @IsString() className: string;
  @IsNotEmpty() @IsString() classCode: string;
  @IsNotEmpty() @IsString() courseId: string;
  @IsNotEmpty() @IsString() teacherId: string;
  @IsNotEmpty() @IsString() semester: string;
  @IsNotEmpty() @IsString() academicYear: string;

  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() roomNumber?: string;
  @IsOptional() @IsString() schedule?: string;
  @IsOptional() @IsNumber() @Min(1) classCapacity?: number;
  @IsOptional() @IsEnum(['active', 'inactive', 'completed']) status?: string;
  @IsOptional() @IsEnum(['lecture', 'lab', 'seminar', 'online']) classType?: string;
}
