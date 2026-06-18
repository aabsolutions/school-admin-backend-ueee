import { Transform, Type } from 'class-transformer';
import {
  IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional,
  IsString, ValidateNested,
} from 'class-validator';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

export class BulkStudentItemDto {
  @Transform(toUpper) @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() dni: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsEnum(['URBANA', 'RURAL', 'FUERA DEL CANTÓN']) residenceZone?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsString() address?: string;
  @Transform(toUpper) @IsOptional() @IsString() parentGuardianName?: string;
  @IsOptional() @IsString() parentGuardianMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() fatherName?: string;
  @IsOptional() @IsString() fatherMobile?: string;
  @Transform(toUpper) @IsOptional() @IsString() motherName?: string;
  @IsOptional() @IsString() motherMobile?: string;
  @IsOptional() @IsEnum(['active', 'inactive', 'graduated', 'suspended']) status?: string;
}

export class BulkCreateStudentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkStudentItemDto)
  records: BulkStudentItemDto[];
}

export interface BulkImportResult {
  total: number;
  successCount: number;
  failureCount: number;
  created: any[];
  failed: { row: number; data: any; error: string }[];
}
