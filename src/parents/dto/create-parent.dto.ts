import {
  IsString, IsNotEmpty, IsEmail, IsOptional,
  IsEnum, IsArray, IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateParentDto {
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

  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsEnum(['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'])
  educationLevel?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  studentIds?: string[];
}
