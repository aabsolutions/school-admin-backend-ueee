import { Injectable } from '@nestjs/common';
import * as htmlPdf from 'html-pdf-node';

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

export interface PdfOpts {
  membreteUrl?: string;
  topMm?: number;
  bottomMm?: number;
}

@Injectable()
export class PdfService {
  async generatePdf(renderedHtml: string, opts: PdfOpts = {}): Promise<Buffer> {
    const { membreteUrl, topMm = 40, bottomMm = 40 } = opts;

    let css: string;
    let options: Record<string, unknown>;

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
    } else {
      css = BASE_CSS;
      options = {
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      };
    }

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${bodyContent}</body></html>`;
    const buffer: Buffer = await htmlPdf.generatePdf({ content: html } as any, options as any);
    return buffer;
  }
}
