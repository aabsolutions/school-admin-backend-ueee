import {
  IsString, IsEmail, IsOptional,
  IsEnum, IsBoolean,
} from 'class-validator';

export class UpdateParentDto {
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
  @IsBoolean()
  isActive?: boolean;
}
