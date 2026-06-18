import {
  IsString, IsNotEmpty, IsEmail, IsOptional,
  IsEnum, IsArray, IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' ? undefined : value;

export class CreateParentDto {
  @Transform(toUpper)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsEmail()
  email?: string;

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

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  username?: string;

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  studentIds?: string[];
}
