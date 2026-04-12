import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentalEstudianteDto {
  @IsOptional() @IsBoolean() boleta2do?: boolean;
  @IsOptional() @IsBoolean() boleta3ro?: boolean;
  @IsOptional() @IsBoolean() boleta4to?: boolean;
  @IsOptional() @IsBoolean() boleta5to?: boolean;
  @IsOptional() @IsBoolean() boleta6to?: boolean;
  @IsOptional() @IsBoolean() boleta7mo?: boolean;
  @IsOptional() @IsBoolean() boleta8vo?: boolean;
  @IsOptional() @IsBoolean() boleta9no?: boolean;
  @IsOptional() @IsBoolean() boleta10mo?: boolean;
  @IsOptional() @IsBoolean() boleta1roBach?: boolean;
  @IsOptional() @IsBoolean() boleta2doBach?: boolean;
  @IsOptional() @IsBoolean() copiaCedulaEstudiante?: boolean;
  @IsOptional() @IsBoolean() copiaCedulaRepresentante?: boolean;
  @IsOptional() @IsBoolean() certificadoParticipacion?: boolean;
  @IsOptional() @IsString() notas?: string;
}
