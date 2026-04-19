import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateStudentGeneralDto {
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsEnum(['URBANA', 'RURAL', 'FUERA DEL CANTÓN']) residenceZone?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsNumber() @Min(0) peso?: number;
  @IsOptional() @IsNumber() @Min(0) talla?: number;
  @IsOptional() @IsString() parentGuardianName?: string;
  @IsOptional() @IsString() parentGuardianMobile?: string;
  @IsOptional() @IsString() fatherName?: string;
  @IsOptional() @IsString() fatherMobile?: string;
  @IsOptional() @IsString() motherName?: string;
  @IsOptional() @IsString() motherMobile?: string;
}
