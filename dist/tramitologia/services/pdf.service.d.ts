export interface PdfOpts {
    membreteUrl?: string;
    topMm?: number;
    bottomMm?: number;
}
export declare class PdfService {
    generatePdf(renderedHtml: string, opts?: PdfOpts): Promise<Buffer>;
}
