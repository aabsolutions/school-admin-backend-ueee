import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAreaEstudioDto {
  @IsNotEmpty() @IsString() nombre: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
