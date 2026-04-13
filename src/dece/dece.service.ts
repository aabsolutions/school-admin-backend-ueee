import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DeceExpediente, DeceExpedienteDocument } from './schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroDocument } from './schemas/dece-registro.schema';
import { CreateDeceExpedienteDto } from './dto/create-dece-expediente.dto';
import { CreateDeceRegistroDto } from './dto/create-dece-registro.dto';
import { UpdateDeceRegistroDto } from './dto/update-dece-registro.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { StudentsService } from '../students/students.service';

@Injectable()
export class DeceService {
  constructor(
    @InjectModel(DeceExpediente.name)
    private readonly expedienteModel: Model<DeceExpedienteDocument>,
    @InjectModel(DeceRegistro.name)
    private readonly registroModel: Model<DeceRegistroDocument>,
    private readonly studentsService: StudentsService,
  ) {}

  // ─── Expedientes ───────────────────────────────────────────────────────────

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;

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
        ? [{
            $match: {
              $or: [
                { 'student.name':  { $regex: search, $options: 'i' } },
                { 'student.dni':   { $regex: search, $options: 'i' } },
                { 'student.email': { $regex: search, $options: 'i' } },
              ],
            },
          }]
        : []),
      {
        $lookup: {
          from: 'deceregistros',
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

    const [countResult, data] = await Promise.all([
      this.expedienteModel.aggregate([...pipeline, { $count: 'total' }]),
      this.expedienteModel.aggregate([...pipeline, { $skip: (page - 1) * limit }, { $limit: limit }]),
    ]);

    const total = countResult[0]?.total ?? 0;
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findByStudent(studentId: string): Promise<DeceExpedienteDocument | null> {
    return this.expedienteModel
      .findOne({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', 'name email dni gender mobile img')
      .exec();
  }

  async findByUserIdWithRegistros(userId: string) {
    let student: any;
    try {
      student = await this.studentsService.findByUserId(userId);
    } catch {
      return { expediente: null, registros: [] };
    }
    const expediente = await this.findByStudent(student._id.toString());
    if (!expediente) return { expediente: null, registros: [] };
    const registros = await this.registroModel
      .find({ expedienteId: expediente._id })
      .sort({ fecha: -1 })
      .exec();
    return { expediente, registros };
  }

  async findOne(id: string): Promise<DeceExpedienteDocument> {
    const exp = await this.expedienteModel
      .findById(id)
      .populate('studentId', 'name email dni gender mobile img')
      .exec();
    if (!exp) throw new NotFoundException('Expediente DECE no encontrado');
    return exp;
  }

  async create(dto: CreateDeceExpedienteDto): Promise<DeceExpedienteDocument> {
    try {
      return await new this.expedienteModel({
        studentId: new Types.ObjectId(dto.studentId),
        notas: dto.notas,
      }).save();
    } catch (err: any) {
      if (err.code === 11000)
        throw new ConflictException('Este estudiante ya tiene un expediente DECE');
      throw err;
    }
  }

  async getOrCreate(studentId: string): Promise<DeceExpedienteDocument> {
    const existing = await this.expedienteModel.findOne({
      studentId: new Types.ObjectId(studentId),
    });
    if (existing) return existing;
    return this.create({ studentId });
  }

  async remove(id: string): Promise<void> {
    const count = await this.registroModel.countDocuments({
      expedienteId: new Types.ObjectId(id),
    });
    if (count > 0) {
      throw new Error('No se puede eliminar un expediente DECE que tiene registros');
    }
    const result = await this.expedienteModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Expediente DECE no encontrado');
  }

  // ─── Registros ─────────────────────────────────────────────────────────────

  async getRegistros(expedienteId: string) {
    await this.findOne(expedienteId);
    return this.registroModel
      .find({ expedienteId: new Types.ObjectId(expedienteId) })
      .sort({ fecha: -1 })
      .exec();
  }

  async addRegistro(
    expedienteId: string,
    dto: CreateDeceRegistroDto,
    evidencias: string[] = [],
  ): Promise<DeceRegistroDocument> {
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
    dto: UpdateDeceRegistroDto,
    newEvidencias: string[] = [],
  ): Promise<DeceRegistroDocument> {
    const update: any = {
      ...dto,
      ...(dto.fecha ? { fecha: new Date(dto.fecha) } : {}),
    };
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
    if (!registro) throw new NotFoundException('Registro DECE no encontrado');
    return registro;
  }

  async deleteRegistro(expedienteId: string, registroId: string): Promise<void> {
    const result = await this.registroModel.findOneAndDelete({
      _id: registroId,
      expedienteId: new Types.ObjectId(expedienteId),
    });
    if (!result) throw new NotFoundException('Registro DECE no encontrado');
  }

  /** Removes a single evidencia URL from a registro's array */
  async deleteEvidencia(
    expedienteId: string,
    registroId: string,
    url: string,
  ): Promise<DeceRegistroDocument> {
    const registro = await this.registroModel.findOneAndUpdate(
      { _id: registroId, expedienteId: new Types.ObjectId(expedienteId) },
      { $pull: { evidencias: url } },
      { new: true },
    );
    if (!registro) throw new NotFoundException('Registro DECE no encontrado');
    return registro;
  }

  // ─── Reporte ───────────────────────────────────────────────────────────────

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
          from: 'deceexpedientes',
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
}
