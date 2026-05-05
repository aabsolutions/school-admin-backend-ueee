import { Injectable } from '@nestjs/common';
import * as htmlPdf from 'html-pdf-node';

const CSS = `
  body { font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin: 0; padding: 0; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #ccc; padding: 6px 8px; }
  .missing-var { color: #e00; }
  @page { size: A4; margin: 20mm; }
`;

@Injectable()
export class PdfService {
  async generatePdf(renderedHtml: string): Promise<Buffer> {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${renderedHtml}</body></html>`;
    const file = { content: html };
    const options = { format: 'A4' };
    const buffer: Buffer = await htmlPdf.generatePdf(file as any, options as any);
    return buffer;
  }
}
