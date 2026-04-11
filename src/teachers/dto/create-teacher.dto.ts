import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsEmail() email: string;

  // Optional credentials — if provided, a User account will be created and linked
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;

  @IsOptional() @IsString() img?: string;
  @IsNotEmpty() @IsString() dni: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() departmentId?: string;
  @IsOptional() @IsEnum(['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional']) laboralDependency?: string;
  @IsOptional() @IsEnum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) salarialCategory?: string;
  @IsOptional() @IsString() emergencyName?: string;
  @IsOptional() @IsString() emergencyMobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() subjectSpecialization?: string;
  @IsOptional() @IsNumber() experienceYears?: number;
  @IsOptional() @IsEnum(['active', 'inactive', 'on-leave']) status?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() bio?: string;
}
