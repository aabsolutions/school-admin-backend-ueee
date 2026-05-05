import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tramite, TramiteDocument } from '../schemas/tramite.schema';
import { ReportsQueryDto } from '../dto/reports-query.dto';

@Injectable()
export class TramiteReportsService {
  constructor(
    @InjectModel(Tramite.name) private readonly tramiteModel: Model<TramiteDocument>,
  ) {}

  async getStats(query: ReportsQueryDto) {
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

  async getExportList(query: ReportsQueryDto) {
    const matchBase = this.buildMatchBase(query);
    return this.tramiteModel
      .find(matchBase)
      .select('codigo state plantilla.nombre solicitanteRole operativoUserId createdAt closedAt lastObservation')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  private buildMatchBase(query: ReportsQueryDto): Record<string, unknown> {
    const match: Record<string, unknown> = {};
    if (query.dateFrom || query.dateTo) {
      match['createdAt'] = {};
      if (query.dateFrom) (match['createdAt'] as any).$gte = new Date(query.dateFrom);
      if (query.dateTo) (match['createdAt'] as any).$lte = new Date(query.dateTo);
    }
    if (query.categoria) match['plantilla.nombre'] = { $regex: query.categoria, $options: 'i' };
    if (query.operativoUserId) match['operativoUserId'] = new Types.ObjectId(query.operativoUserId);
    return match;
  }
}
