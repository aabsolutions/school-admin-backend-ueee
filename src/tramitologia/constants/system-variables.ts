export const SYSTEM_VARIABLES = ['FECHA_ACTUAL', 'USUARIO_LOGUEADO', 'ID_TRAMITE'] as const;
export type SystemVariable = (typeof SYSTEM_VARIABLES)[number];
