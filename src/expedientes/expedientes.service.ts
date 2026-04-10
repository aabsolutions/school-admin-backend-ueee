import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expediente, ExpedienteDocument } from './schemas/expediente.schema';
import {
  ExpedienteRegistro,
  ExpedienteRegistroDocument,
} from './schemas/expediente-registro.schema';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { CreateExpedienteRegistroDto } from './dto/create-expediente-registro.dto';
import { UpdateExpedienteRegistroDto } from './dto/update-expediente-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectModel(Expediente.name)
    private readonly expedienteModel: Model<ExpedienteDocument>,
    @InjectModel(ExpedienteRegistro.name)
    private readonly registroModel: Model<ExpedienteRegistroDocument>,
  ) {}

  // ─── Expedientes ───────────────────────────────────────────────────────────

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    // We need to populate and then filter — build a pipeline
    const studentFilter: any = {};
    if (search) {
      studentFilter.$or = [
        { 'student.name':  { $regex: search, $options: 'i' } },
        { 'student.dni':   { $regex: search, $options: 'i' } },
        { 'student.email': { $regex: search, $options: 'i' } },
      ];
    }

    // Aggregate to get expediente + student info + registro count
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: 'student',
        },
      },
      { $unwind: '$student' },
      ...(search
        ? [
            {
              $match: {
                $or: [
                  { 'student.name':  { $regex: search, $options: 'i' } },
                  { 'student.dni':   { $regex: search, $options: 'i' } },
                  { 'student.email': { $regex: search, $options: 'i' } },
                ],
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'expedienteregistros',
          localField: '_id',
          foreignField: 'expedienteId',
          as: 'registros',
        },
      },
      {
        $addFields: {
          totalRegistros: { $size: '$registros' },
          ultimoRegistro: { $max: '$registros.fecha' },
        },
      },
      { $project: { registros: 0 } },
      { $sort: { [sortBy === 'createdAt' ? 'createdAt' : sortBy]: sortOrder === 'asc' ? 1 : -1 } },
    ];

    const countPipeline = [...pipeline, { $count: 'total' }];
    const dataPipeline  = [
      ...pipeline,
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const [countResult, data] = await Promise.all([
      this.expedienteModel.aggregate(countPipeline),
      this.expedienteModel.aggregate(dataPipeline),
    ]);

    const total = countResult[0]?.total ?? 0;
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findByStudent(studentId: string): Promise<ExpedienteDocument | null> {
    return this.expedienteModel
      .findOne({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', 'name email dni gender mobile img')
      .exec();
  }

  async findOne(id: string): Promise<ExpedienteDocument> {
    const exp = await this.expedienteModel
      .findById(id)
      .populate('studentId', 'name email dni gender mobile img')
      .exec();
    if (!exp) throw new NotFoundException('Expediente no encontrado');
    return exp;
  }

  async create(dto: CreateExpedienteDto): Promise<ExpedienteDocument> {
    try {
      return await new this.expedienteModel({
        studentId: new Types.ObjectId(dto.studentId),
        notas: dto.notas,
      }).save();
    } catch (err: any) {
      if (err.code === 11000)
        throw new ConflictException('Este estudiante ya tiene un expediente');
      throw err;
    }
  }

  /** Get or create an expediente for a student */
  async getOrCreate(studentId: string): Promise<ExpedienteDocument> {
    const existing = await this.expedienteModel.findOne({
      studentId: new Types.ObjectId(studentId),
    });
    if (existing) return existing;
    return this.create({ studentId });
  }

  async getReporte(filters: {
    fechaDesde?: string;
    fechaHasta?: string;
    tipo?: string;
    creadoPor?: string;
    studentId?: string;
  }) {
    const match: any = {};
    if (filters.tipo) match.tipo = filters.tipo;
    if (filters.creadoPor) match.creadoPor = { $regex: filters.creadoPor, $options: 'i' };
    if (filters.fechaDesde || filters.fechaHasta) {
      match.fecha = {};
      if (filters.fechaDesde) match.fecha.$gte = new Date(filters.fechaDesde);
      if (filters.fechaHasta) match.fecha.$lte = new Date(filters.fechaHasta);
    }

    const pipeline: any[] = [
      { $match: match },
      {
        $lookup: {
          from: 'expedientes',
          localField: 'expedienteId',
          foreignField: '_id',
          as: 'expediente',
        },
      },
      { $unwind: '$expediente' },
      {
        $lookup: {
          from: 'students',
          localField: 'expediente.studentId',
          foreignField: '_id',
          as: 'student',
        },
      },
      { $unwind: '$student' },
    ];

    if (filters.studentId) {
      pipeline.push({
        $match: { 'expediente.studentId': new Types.ObjectId(filters.studentId) },
      });
    }

    pipeline.push(
      {
        $project: {
          tipo: 1, fecha: 1, descripcion: 1, creadoPor: 1, evidencias: 1, createdAt: 1,
          expedienteId: 1,
          studentName:            '$student.name',
          studentDni:             '$student.dni',
          studentMobile:          '$student.mobile',
          studentAddress:         '$student.address',
          parentGuardianName:     '$student.parentGuardianName',
          parentGuardianMobile:   '$student.parentGuardianMobile',
        },
      },
      { $sort: { fecha: -1 } },
    );

    return this.registroModel.aggregate(pipeline);
  }

  async remove(id: string): Promise<void> {
    const count = await this.registroModel.countDocuments({
      expedienteId: new Types.ObjectId(id),
    });
    if (count > 0) {
      throw new Error('No se puede eliminar un expediente que tiene registros');
    }
    const result = await this.expedienteModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Expediente no encontrado');
  }

  // ─── Registros ─────────────────────────────────────────────────────────────

  async getRegistros(expedienteId: string) {
    await this.findOne(expedienteId); // 404 if not found
    return this.registroModel
      .find({ expedienteId: new Types.ObjectId(expedienteId) })
      .sort({ fecha: -1 })
      .exec();
  }

  async addRegistro(
    expedienteId: string,
    dto: CreateExpedienteRegistroDto,
    evidencias: string[] = [],
  ): Promise<ExpedienteRegistroDocument> {
    await this.findOne(expedienteId);
    return new this.registroModel({
      expedienteId: new Types.ObjectId(expedienteId),
      tipo:         dto.tipo,
      fecha:        new Date(dto.fecha),
      descripcion:  dto.descripcion,
      evidencias:   [...(dto.evidencias ?? []), ...evidencias],
      creadoPor:    dto.creadoPor,
    }).save();
  }

  async updateRegistro(
    expedienteId: string,
    registroId: string,
    dto: UpdateExpedienteRegistroDto,
    newEvidencias: string[] = [],
  ): Promise<ExpedienteRegistroDocument> {
    const update: any = {
      ...dto,
      ...(dto.fecha ? { fecha: new Date(dto.fecha) } : {}),
    };
    // Remove evidencias from $set — they are managed separately via $push
    delete update.evidencias;

    const ops: any = { $set: update };
    if (newEvidencias.length > 0) {
      ops.$push = { evidencias: { $each: newEvidencias } };
    }

    const registro = await this.registroModel.findOneAndUpdate(
      { _id: registroId, expedienteId: new Types.ObjectId(expedienteId) },
      ops,
      { new: true },
    );
    if (!registro) throw new NotFoundException('Registro no encontrado');
    return registro;
  }

  async deleteRegistro(expedienteId: string, registroId: string): Promise<void> {
    const result = await this.registroModel.findOneAndDelete({
      _id: registroId,
      expedienteId: new Types.ObjectId(expedienteId),
    });
    if (!result) throw new NotFoundException('Registro no encontrado');
  }

  /** Removes a single evidencia URL from a registro's array */
  async deleteEvidencia(
    expedienteId: string,
    registroId: string,
    url: string,
  ): Promise<ExpedienteRegistroDocument> {
    const registro = await this.registroModel.findOneAndUpdate(
      { _id: registroId, expedienteId: new Types.ObjectId(expedienteId) },
      { $pull: { evidencias: url } },
      { new: true },
    );
    if (!registro) throw new NotFoundException('Registro no encontrado');
    return registro;
  }
}
