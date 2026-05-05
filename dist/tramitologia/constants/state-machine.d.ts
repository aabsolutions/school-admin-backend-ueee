import { TramiteState } from '../schemas/tramite.schema';
export declare const TRANSITIONS: Record<TramiteState, TramiteState[]>;
export declare function isValidTransition(from: TramiteState, to: TramiteState): boolean;
