"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const htmlPdf = require("html-pdf-node");
const BASE_CSS = `
  body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; color: #000; margin: 0; padding: 0; }
  p { margin-top: 0; margin-bottom: 0.75em; min-height: 1em; }
  h1 { font-size: 18pt; margin: 0.5em 0; }
  h2 { font-size: 16pt; margin: 0.5em 0; }
  h3 { font-size: 14pt; margin: 0.5em 0; }
  h4, h5, h6 { font-size: 12pt; margin: 0.5em 0; }
  ul, ol { padding-left: 1.5em; margin-bottom: 0.75em; }
  blockquote { border-left: 4px solid #ccc; padding-left: 1em; margin: 0 0 0.75em; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 0.75em; }
  td, th { border: 1px solid #ccc; padding: 6px 8px; }
  .missing-var { color: #e00; }
`;
let PdfService = class PdfService {
    async generatePdf(renderedHtml, opts = {}) {
        const { membreteUrl, topMm = 40, bottomMm = 40 } = opts;
        let css;
        let options;
        let bodyContent = renderedHtml;
        if (membreteUrl) {
            css = `
        ${BASE_CSS}
        body { padding: ${topMm}mm 20mm ${bottomMm}mm 20mm; }
      `;
            options = {
                format: 'A4',
                printBackground: true,
                margin: { top: '0', right: '0', bottom: '0', left: '0' },
            };
            bodyContent = `<img src="${membreteUrl}" style="position:fixed;top:0;left:0;width:210mm;height:297mm;z-index:-1;" />${renderedHtml}`;
        }
        else {
            css = BASE_CSS;
            options = {
                format: 'A4',
                margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
            };
        }
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${bodyContent}</body></html>`;
        const buffer = await htmlPdf.generatePdf({ content: html }, options);
        return buffer;
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map