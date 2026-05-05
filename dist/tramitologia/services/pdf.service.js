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
const CSS = `
  body { font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #ccc; padding: 6px 8px; }
  .missing-var { color: #e00; }
  @page { size: A4; margin: 20mm; }
`;
let PdfService = class PdfService {
    async generatePdf(renderedHtml) {
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${renderedHtml}</body></html>`;
        const file = { content: html };
        const options = { format: 'A4' };
        const buffer = await htmlPdf.generatePdf(file, options);
        return buffer;
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map