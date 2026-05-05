import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, Allow } from 'class-validator';
import { Type } from 'class-transformer';

export class FilledValueDto {
  @IsString() @IsNotEmpty() key: string;
  @Allow() value: unknown;
}

export class CreateTramiteDto {
  @IsString() @IsNotEmpty() plantillaId: string;

  @IsOptional() @IsString() operativoUserId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilledValueDto)
  values?: FilledValueDto[];
}
