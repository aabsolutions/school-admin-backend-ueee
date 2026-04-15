import { IsEmail, IsMongoId, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateInstitucionDto {
  @IsOptional() @IsString() nombre?: string;
  @IsOptional() @IsString() codigoAMIE?: string;
  @IsOptional() @IsString() distrito?: string;
  @IsOptional() @IsString() provincia?: string;
  @IsOptional() @IsString() canton?: string;
  @IsOptional() @IsString() contacto?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() direccion?: string;
  @IsOptional() @IsMongoId() autoridad?: string;
  @IsOptional() @IsString() @Matches(/^\d{4}-\d{4}$/, { message: 'periodoLectivoFuncional debe tener el formato YYYY-YYYY' })
  periodoLectivoFuncional?: string;
}
