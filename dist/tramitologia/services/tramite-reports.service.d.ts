import { Model, Types } from 'mongoose';
import { Tramite, TramiteDocument } from '../schemas/tramite.schema';
import { ReportsQueryDto } from '../dto/reports-query.dto';
export declare class TramiteReportsService {
    private readonly tramiteModel;
    constructor(tramiteModel: Model<TramiteDocument>);
    getStats(query: ReportsQueryDto): Promise<{
        totals: any;
        byState: any[];
        byCategoria: any[];
        byOperativo: any[];
        timeSeries: any[];
    }>;
    getExportList(query: ReportsQueryDto): Promise<(Tramite & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    private buildMatchBase;
}
