import {
  IsString, IsOptional, IsBoolean, IsArray, IsIn, ValidateNested, IsEnum,
  IsNumber, IsNotEmpty, Min, ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VariableConfigDto {
  @IsString() @IsNotEmpty() key: string;
  @IsString() @IsNotEmpty() label: string;
  @IsEnum(['text', 'textarea', 'select', 'date', 'number', 'email']) fieldType: string;
  @IsBoolean() required: boolean;
  @IsArray() @IsString({ each: true }) options: string[] = [];
  @IsOptional() @IsString() defaultValue?: string;
  @IsOptional() @IsString() placeholder?: string;
  @IsNumber() @Min(0) order: number = 0;
}

export class RequiredAttachmentDto {
  @IsString() @IsNotEmpty() name: string;
  @IsOptional() @IsString() description?: string;
  @IsBoolean() required: boolean = true;
  @IsArray() @IsString({ each: true }) allowedMimes: string[] = [];
  @IsNumber() @Min(0) maxSizeBytes: number = 10 * 1024 * 1024;
}

export class CreatePlantillaDto {
  @IsString() @IsNotEmpty() nombre: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsString() @IsNotEmpty() categoria: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['STUDENT', 'TEACHER', 'PARENT'], { each: true })
  solicitanteRoles?: string[];

  @IsString() @IsNotEmpty() bodyHtml: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariableConfigDto)
  variables?: VariableConfigDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequiredAttachmentDto)
  requiredAttachments?: RequiredAttachmentDto[];
}
