import {
  IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional,
  IsString, IsDateString, Min, MinLength, IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' ? undefined : value;

export class CreateStudentDto {
  @Transform(toUpper) @IsNotEmpty() @IsString() name: string;
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional() @IsEmail() email?: string;

  // Optional credentials — if provided, a User account will be created and linked
  @Transform(emptyToUndefined) @IsOptional() @IsString() username?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsString() @MinLength(6) password?: string;

  @IsOptional() @IsString() img?: string;
  @IsOptional() @IsString() imgCuerpoEntero?: string;
  @IsOptional() @IsNumber() @Min(0) peso?: number;
  @IsOptional() @IsNumber() @Min(0) talla?: number;
  @IsNotEmpty() @IsString() dni: string;
  @IsOptional() @IsString() mobile?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['URBANA', 'RURAL', 'FUERA DEL CANTÓN']) residenceZone?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() address?: string;
  @Transform(toUpper) @IsOptional() @IsString() parentGuardianName?: string;
  @IsOptional() @IsString() parentGuardianMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() fatherName?: string;
  @IsOptional() @IsString() fatherMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() motherName?: string;
  @IsOptional() @IsString() motherMobile?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['active', 'inactive', 'graduated', 'suspended']) status?: string;
  @IsOptional() @IsMongoId() fatherId?: string | null;
  @IsOptional() @IsMongoId() motherId?: string | null;
  @IsOptional() @IsMongoId() guardianId?: string | null;
}
