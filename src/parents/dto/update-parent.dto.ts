import {
  IsString, IsEmail, IsOptional,
  IsEnum, IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' ? undefined : value;

export class UpdateParentDto {
  @Transform(toUpper)
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsEnum(['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'])
  educationLevel?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
