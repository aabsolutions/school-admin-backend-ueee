import { TramiteState } from '../schemas/tramite.schema';
import { FilledValueDto } from './create-tramite.dto';
export declare class TransitionTramiteDto {
    newState: TramiteState;
    observation?: string;
    respuestaValues?: FilledValueDto[];
    respuestaBodyOverride?: string;
}
