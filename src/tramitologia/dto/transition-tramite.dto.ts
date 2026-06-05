import { IsEnum, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TramiteState } from '../schemas/tramite.schema';
import { FilledValueDto } from './create-tramite.dto';

export class TransitionTramiteDto {
  @IsEnum(TramiteState) newState: TramiteState;
  @IsOptional() @IsString() observation?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilledValueDto)
  respuestaValues?: FilledValueDto[];

  @IsOptional() @IsString() respuestaBodyOverride?: string;
}
