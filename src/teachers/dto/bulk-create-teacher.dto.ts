import { Transform, Type } from 'class-transformer';
import {
  IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber,
  IsOptional, IsString, ValidateNested, Min,
} from 'class-validator';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

export class BulkTeacherItemDto {
  @Transform(toUpper) @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() dni: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() subjectSpecialization?: string;
  @IsOptional() @IsNumber() @Min(0) experienceYears?: number;
  @IsOptional() @IsEnum(['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional']) laboralDependency?: string;
  @IsOptional() @IsEnum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) salarialCategory?: string;
  @Transform(toUpper) @IsOptional() @IsString() emergencyName?: string;
  @IsOptional() @IsString() emergencyMobile?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsEnum(['active', 'inactive', 'on-leave']) status?: string;
}

export class BulkCreateTeacherDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkTeacherItemDto)
  records: BulkTeacherItemDto[];
}
