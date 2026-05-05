import { Injectable } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';
import { PlantillaSnapshot, FilledValue } from '../schemas/tramite.schema';

export interface RenderContext {
  fechaActual: string;
  usuarioLogueado: string;
  idTramite: string;
}

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'blockquote', 'pre', 'code', 'a', 'img', 'span', 'div',
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  '*': ['style', 'class'],
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height'],
};

const ALLOWED_STYLES: sanitizeHtml.IOptions['allowedStyles'] = {
  '*': {
    'text-align': [/^(left|right|center|justify)$/],
    color: [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/],
    'background-color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/],
  },
};

@Injectable()
export class TemplateRendererService {
  render(snapshot: PlantillaSnapshot, values: FilledValue[], ctx: RenderContext): string {
    const valueMap = new Map(values.map((v) => [v.key, String(v.value ?? '')]));

    const sysMap: Record<string, string> = {
      FECHA_ACTUAL: ctx.fechaActual,
      USUARIO_LOGUEADO: ctx.usuarioLogueado,
      ID_TRAMITE: ctx.idTramite,
    };

    let html = snapshot.bodyHtml;

    html = html.replace(/\[([A-Z][A-Z0-9_]{0,49})\]/g, (_match, key: string) => {
      if (sysMap[key] !== undefined) return sysMap[key];
      if (valueMap.has(key)) return valueMap.get(key)!;
      return `<span class="missing-var">[${key}]</span>`;
    });

    return sanitizeHtml(html, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
      allowedStyles: ALLOWED_STYLES,
    });
  }
}
