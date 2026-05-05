import { TramiteReportsService } from '../services/tramite-reports.service';
import { ReportsQueryDto } from '../dto/reports-query.dto';
export declare class TramiteReportsController {
    private readonly reportsService;
    constructor(reportsService: TramiteReportsService);
    getStats(query: ReportsQueryDto): Promise<{
        totals: any;
        byState: any[];
        byCategoria: any[];
        byOperativo: any[];
        timeSeries: any[];
    }>;
    getExport(query: ReportsQueryDto): Promise<(import("../schemas/tramite.schema").Tramite & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
