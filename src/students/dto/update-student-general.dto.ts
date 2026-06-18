import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' ? undefined : value;

export class UpdateStudentGeneralDto {
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @Transform(emptyToUndefined) @IsOptional() @IsEnum(['URBANA', 'RURAL', 'FUERA DEL CANTÓN']) residenceZone?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsNumber() @Min(0) peso?: number;
  @IsOptional() @IsNumber() @Min(0) talla?: number;
  @Transform(toUpper) @IsOptional() @IsString() parentGuardianName?: string;
  @IsOptional() @IsString() parentGuardianMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() fatherName?: string;
  @IsOptional() @IsString() fatherMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() motherName?: string;
  @IsOptional() @IsString() motherMobile?: string;
}
