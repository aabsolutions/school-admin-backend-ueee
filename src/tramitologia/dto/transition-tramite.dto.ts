import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TramiteState } from '../schemas/tramite.schema';

export class TransitionTramiteDto {
  @IsEnum(TramiteState) newState: TramiteState;
  @IsOptional() @IsString() observation?: string;
}
