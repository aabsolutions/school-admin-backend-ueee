import {
  IsEmail, IsEnum, IsNotEmpty, IsOptional,
  IsString, IsDateString, MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsEmail() email: string;

  // Optional credentials — if provided, a User account will be created and linked
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;

  @IsOptional() @IsString() img?: string;
  @IsNotEmpty() @IsString() dni: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsEnum(['URBANA', 'RURAL', 'FUERA DEL CANTÓN']) residenceZone?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() parentGuardianName?: string;
  @IsOptional() @IsString() parentGuardianMobile?: string;
  @IsOptional() @IsString() fatherName?: string;
  @IsOptional() @IsString() fatherMobile?: string;
  @IsOptional() @IsString() motherName?: string;
  @IsOptional() @IsString() motherMobile?: string;
  @IsOptional() @IsEnum(['active', 'inactive', 'graduated', 'suspended']) status?: string;
}
