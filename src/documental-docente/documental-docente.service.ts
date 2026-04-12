import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  DocumentalDocente,
  DocumentalDocenteDocument,
} from './schemas/documental-docente.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class DocumentalDocenteService {
  constructor(
    @InjectModel(DocumentalDocente.name)
    private readonly model: Model<DocumentalDocenteDocument>,
  ) {}

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'teachers',
          localField: 'teacherId',
          foreignField: '_id',
          as: 'teacher',
        },
      },
      { $unwind: '$teacher' },
      ...(search
        ? [
            {
              $match: {
                $or: [
                  { 'teacher.name': { $regex: search, $options: 'i' } },
                  { 'teacher.dni': { $regex: search, $options: 'i' } },
                  { 'teacher.email': { $regex: search, $options: 'i' } },
                ],
              },
            },
          ]
        : []),
      {
        $addFields: {
          totalProfesionales: {
            $size: {
              $filter: {
                input: '$documentos',
                as: 'd',
                cond: { $eq: ['$$d.categoria', 'profesional'] },
              },
            },
          },
          totalPlanificaciones: {
            $size: {
              $filter: {
                input: '$documentos',
                as: 'd',
                cond: { $eq: ['$$d.categoria', 'planificacion'] },
              },
            },
          },
        },
      },
      {
        $project: {
          teacherId: 1,
          totalProfesionales: 1,
          totalPlanificaciones: 1,
          createdAt: 1,
          'teacher.name': 1,
          'teacher.dni': 1,
          'teacher.email': 1,
          'teacher.img': 1,
        },
      },
      { $sort: { 'teacher.name': 1 } },
    ];

    const countPipeline = [...pipeline, { $count: 'total' }];
    const dataPipeline = [
      ...pipeline,
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const [countResult, data] = await Promise.all([
      this.model.aggregate(countPipeline),
      this.model.aggregate(dataPipeline),
    ]);

    const total = countResult[0]?.total ?? 0;
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findByTeacher(teacherId: string): Promise<DocumentalDocenteDocument> {
    const record = await this.model
      .findOne({ teacherId: new Types.ObjectId(teacherId) })
      .populate('teacherId', 'name email dni gender mobile img')
      .exec();

    if (!record) throw new NotFoundException('Expediente documental no encontrado');
    return record;
  }

  async getOrCreate(teacherId: string): Promise<DocumentalDocenteDocument> {
    let record = await this.model.findOne({
      teacherId: new Types.ObjectId(teacherId),
    });

    if (!record) {
      record = await new this.model({
        teacherId: new Types.ObjectId(teacherId),
      }).save();
    }

    await record.populate('teacherId', 'name email dni gender mobile img');
    return record;
  }

  async addDocumento(
    teacherId: string,
    nombre: string,
    categoria: 'profesional' | 'planificacion',
    url: string,
    descripcion?: string,
  ): Promise<DocumentalDocenteDocument> {
    const record = await this.getOrCreate(teacherId);
    const nuevoDoc: any = { nombre, url, categoria, fecha: new Date() };
    if (descripcion) nuevoDoc.descripcion = descripcion;

    const updated = await this.model.findByIdAndUpdate(
      record._id,
      { $push: { documentos: nuevoDoc } },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Registro no encontrado');
    return updated;
  }

  async deleteDocumento(
    teacherId: string,
    docId: string,
  ): Promise<{ url: string; record: DocumentalDocenteDocument }> {
    const record = await this.model.findOne({
      teacherId: new Types.ObjectId(teacherId),
    });
    if (!record) throw new NotFoundException('Expediente documental no encontrado');

    const doc = record.documentos.find(
      (d: any) => d._id.toString() === docId,
    );
    if (!doc) throw new NotFoundException('Documento no encontrado');

    const updated = await this.model.findByIdAndUpdate(
      record._id,
      { $pull: { documentos: { _id: new Types.ObjectId(docId) } } },
      { new: true },
    );

    return { url: doc.url, record: updated! };
  }
}
