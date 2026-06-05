import { PlantillaSnapshot, FilledValue } from '../schemas/tramite.schema';
export interface RenderContext {
    fechaActual: string;
    usuarioLogueado: string;
    idTramite: string;
    extraSysVars?: Record<string, string>;
}
export declare class TemplateRendererService {
    render(snapshot: PlantillaSnapshot, values: FilledValue[], ctx: RenderContext): string;
}
