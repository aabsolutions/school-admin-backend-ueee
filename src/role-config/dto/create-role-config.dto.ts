import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRoleConfigDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Z_]+$/, { message: 'name must be uppercase letters and underscores only' })
  @Transform(({ value }) => value?.toUpperCase().trim())
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  displayName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sidebarPermissions?: string[];

  @IsOptional()
  @IsNumber()
  priority?: number;
}
