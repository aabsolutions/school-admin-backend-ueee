"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRendererService = void 0;
const common_1 = require("@nestjs/common");
const sanitizeHtml = require("sanitize-html");
const ALLOWED_TAGS = [
    'p', 'br', 'strong', 'em', 'u', 's', 'sub', 'sup', 'hr',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'blockquote', 'pre', 'code', 'a', 'img', 'span', 'div',
];
const ALLOWED_ATTRIBUTES = {
    '*': ['style', 'class'],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
};
const ALLOWED_STYLES = {
    '*': {
        'text-align': [/^(left|right|center|justify)$/],
        color: [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
        'background-color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
        'padding-left': [/^\d+(\.\d+)?(px|em|rem)$/],
    },
};
let TemplateRendererService = class TemplateRendererService {
    render(snapshot, values, ctx) {
        const valueMap = new Map(values.map((v) => [v.key, String(v.value ?? '')]));
        const sysMap = {
            FECHA_ACTUAL: ctx.fechaActual,
            USUARIO_LOGUEADO: ctx.usuarioLogueado,
            ID_TRAMITE: ctx.idTramite,
            ...ctx.extraSysVars,
        };
        let html = snapshot.bodyHtml;
        html = html.replace(/\[([A-Z][A-Z0-9_]{0,49})\]/g, (_match, key) => {
            if (sysMap[key] !== undefined)
                return sysMap[key];
            if (valueMap.has(key))
                return valueMap.get(key);
            return `<span class="missing-var">[${key}]</span>`;
        });
        return sanitizeHtml(html, {
            allowedTags: ALLOWED_TAGS,
            allowedAttributes: ALLOWED_ATTRIBUTES,
            allowedStyles: ALLOWED_STYLES,
            allowedSchemes: ['http', 'https', 'data'],
            nonTextTags: ['style', 'script', 'textarea', 'option', 'noscript'],
        });
    }
};
exports.TemplateRendererService = TemplateRendererService;
exports.TemplateRendererService = TemplateRendererService = __decorate([
    (0, common_1.Injectable)()
], TemplateRendererService);
//# sourceMappingURL=template-renderer.service.js.map