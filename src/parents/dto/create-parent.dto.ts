import {
  IsString, IsNotEmpty, IsEmail, IsOptional,
  IsEnum, IsArray, IsMongoId,
} from 'class-validator';

export class CreateParentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  dni?: string;

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
