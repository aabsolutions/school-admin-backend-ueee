"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TramiteReportsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tramite_schema_1 = require("../schemas/tramite.schema");
let TramiteReportsService = class TramiteReportsService {
    constructor(tramiteModel) {
        this.tramiteModel = tramiteModel;
    }
    async getStats(query) {
        const matchBase = this.buildMatchBase(query);
        const [totalByState, byCategoria, byOperativo, timeSeries, totals] = await Promise.all([
            this.tramiteModel.aggregate([
                { $match: matchBase },
                { $group: { _id: '$state', count: { $sum: 1 } } },
                { $project: { state: '$_id', count: 1, _id: 0 } },
            ]),
            this.tramiteModel.aggregate([
                { $match: matchBase },
                { $group: { _id: '$plantilla.plantillaId', categoria: { $first: '$plantilla.nombre' }, count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 20 },
            ]),
            this.tramiteModel.aggregate([
                { $match: { ...matchBase, operativoUserId: { $exists: true } } },
                {
                    $group: {
                        _id: '$operativoUserId',
                        total: { $sum: 1 },
                        avgResolutionMs: {
                            $avg: {
                                $cond: [
                                    { $ne: ['$closedAt', null] },
                                    { $subtract: ['$closedAt', '$createdAt'] },
                                    null,
                                ],
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: { path: '$user', preserveNullAndEmptyArrays: false } },
                { $project: { operativoName: '$user.name', total: 1, avgResolutionHours: { $divide: ['$avgResolutionMs', 3600000] } } },
                { $sort: { total: -1 } },
            ]),
            this.tramiteModel.aggregate([
                { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' },
                            day: { $dayOfMonth: '$createdAt' },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
            ]),
            this.tramiteModel.aggregate([
                { $match: matchBase },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        avgResolutionMs: {
                            $avg: {
                                $cond: [
                                    { $ne: ['$closedAt', null] },
                                    { $subtract: ['$closedAt', '$createdAt'] },
                                    null,
                                ],
                            },
                        },
                    },
                },
                { $project: { total: 1, avgResolutionHours: { $divide: ['$avgResolutionMs', 3600000] } } },
            ]),
        ]);
        return {
            totals: totals[0] ?? { total: 0, avgResolutionHours: null },
            byState: totalByState,
            byCategoria,
            byOperativo,
            timeSeries,
        };
    }
    async getExportList(query) {
        const matchBase = this.buildMatchBase(query);
        return this.tramiteModel
            .find(matchBase)
            .select('codigo state plantilla.nombre solicitanteRole operativoUserId createdAt closedAt lastObservation')
            .sort({ createdAt: -1 })
            .lean()
            .exec();
    }
    buildMatchBase(query) {
        const match = {};
        if (query.dateFrom || query.dateTo) {
            match['createdAt'] = {};
            if (query.dateFrom)
                match['createdAt'].$gte = new Date(query.dateFrom);
            if (query.dateTo)
                match['createdAt'].$lte = new Date(query.dateTo);
        }
        if (query.categoria)
            match['plantilla.nombre'] = { $regex: query.categoria, $options: 'i' };
        if (query.operativoUserId)
            match['operativoUserId'] = new mongoose_2.Types.ObjectId(query.operativoUserId);
        return match;
    }
};
exports.TramiteReportsService = TramiteReportsService;
exports.TramiteReportsService = TramiteReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tramite_schema_1.Tramite.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TramiteReportsService);
//# sourceMappingURL=tramite-reports.service.js.map