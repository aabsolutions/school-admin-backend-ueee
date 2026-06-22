import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' ? undefined : value;

export class CreateTeacherDto {
  @Transform(toUpper) @IsNotEmpty() @IsString() name: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEmail() email?: string;

  // Optional credentials — if provided, a User account will be created and linked
  @Transform(emptyToUndefined) @IsOptional() @IsString() username?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsString() @MinLength(6) password?: string;

  @IsOptional() @IsString() img?: string;
  @IsOptional() @IsString() imgCuerpoEntero?: string;
  @IsOptional() @IsNumber() @Min(0) peso?: number;
  @IsOptional() @IsNumber() @Min(0) talla?: number;
  @IsNotEmpty() @IsString() dni: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() departmentId?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsMongoId() areaEstudioId?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['CONTRATO', 'NOMBRAMIENTO DEFINITIVO', 'NOMBRAMIENTO PROVISIONAL']) laboralDependency?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['MATUTINA', 'VESPERTINA', 'NOCTURNA']) jornadaLaboral?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEmail() correoInstitucional?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) salarialCategory?: string;
  @Transform(toUpper) @IsOptional() @IsString() emergencyName?: string;
  @IsOptional() @IsString() emergencyMobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() subjectSpecialization?: string;
  @IsOptional() @IsNumber() experienceYears?: number;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['active', 'inactive', 'on-leave']) status?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() bio?: string;
}
