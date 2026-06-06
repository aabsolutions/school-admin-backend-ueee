import { Type } from 'class-transformer';
import {
  IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional,
  IsString, ValidateNested,
} from 'class-validator';

export class BulkParentItemDto {
  @IsNotEmpty() @IsString() name: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() dni?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() occupation?: string;
  @IsOptional() @IsEnum(['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado']) educationLevel?: string;
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsString() password?: string;
}

export class BulkCreateParentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkParentItemDto)
  records: BulkParentItemDto[];
}

export interface BulkParentImportResult {
  total: number;
  successCount: number;
  failureCount: number;
  created: any[];
  failed: { row: number; data: any; error: string }[];
}
