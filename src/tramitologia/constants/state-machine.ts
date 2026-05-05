import { TramiteState } from '../schemas/tramite.schema';

export const TRANSITIONS: Record<TramiteState, TramiteState[]> = {
  [TramiteState.Pendiente]: [TramiteState.EnProceso],
  [TramiteState.EnProceso]: [TramiteState.Aprobado, TramiteState.Rechazado],
  [TramiteState.Aprobado]: [TramiteState.Finalizado],
  [TramiteState.Rechazado]: [],
  [TramiteState.Finalizado]: [],
};

export function isValidTransition(from: TramiteState, to: TramiteState): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}
