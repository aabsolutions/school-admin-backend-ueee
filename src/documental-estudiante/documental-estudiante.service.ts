import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  DocumentalEstudiante,
  DocumentalEstudianteDocument,
} from './schemas/documental-estudiante.schema';
import { UpdateDocumentalEstudianteDto } from './dto/update-documental-estudiante.dto';
import { Enrollment, EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class DocumentalEstudianteService {
  constructor(
    @InjectModel(DocumentalEstudiante.name)
    private readonly model: Model<DocumentalEstudianteDocument>,
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  // ─── Nivel actual del estudiante ───────────────────────────────────────────

  private async getNivelActual(studentId: string): Promise<string | null> {
    const pipeline: any[] = [
      {
        $match: {
          studentId: new Types.ObjectId(studentId),
          status: 'enrolled',
        },
      },
      {
        $lookup: {
          from: 'cursoslectivos',
          localField: 'cursoLectivoId',
          foreignField: '_id',
          as: 'cursoLectivo',
        },
      },
      { $unwind: '$cursoLectivo' },
      { $match: { 'cursoLectivo.status': 'active' } },
      {
        $lookup: {
          from: 'cursos',
          localField: 'cursoLectivo.cursoId',
          foreignField: '_id',
          as: 'curso',
        },
      },
      { $unwind: '$curso' },
      { $project: { nivel: '$curso.nivel' } },
      { $limit: 1 },
    ];

    const result = await this.enrollmentModel.aggregate(pipeline);
    return result[0]?.nivel ?? null;
  }

  // ─── CRUD ──────────────────────────────────────────────────────────────────

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;

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
                  { 'student.name': { $regex: search, $options: 'i' } },
                  { 'student.dni': { $regex: search, $options: 'i' } },
                ],
              },
            },
          ]
        : []),
      {
        $project: {
          studentId: 1,
          boleta2do: 1, boleta3ro: 1, boleta4to: 1,
          boleta5to: 1, boleta6to: 1, boleta7mo: 1, boleta8vo: 1,
          boleta9no: 1, boleta10mo: 1, boleta1roBach: 1, boleta2doBach: 1,
          copiaCedulaEstudiante: 1, copiaCedulaRepresentante: 1,
          certificadoParticipacion: 1,
          notas: 1, createdAt: 1, updatedAt: 1,
          'student.name': 1, 'student.dni': 1, 'student.email': 1, 'student.img': 1,
        },
      },
      { $sort: { 'student.name': 1 } },
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

  async findByStudent(studentId: string) {
    const record = await this.model
      .findOne({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', 'name email dni gender mobile img')
      .exec();

    if (!record) throw new NotFoundException('Expediente documental no encontrado');

    const nivelActual = await this.getNivelActual(studentId);
    return { ...record.toObject(), nivelActual };
  }

  async getOrCreate(studentId: string) {
    let record = await this.model.findOne({
      studentId: new Types.ObjectId(studentId),
    });

    if (!record) {
      record = await new this.model({
        studentId: new Types.ObjectId(studentId),
      }).save();
    }

    await record.populate('studentId', 'name email dni gender mobile img');
    const nivelActual = await this.getNivelActual(studentId);
    return { ...record.toObject(), nivelActual };
  }

  async update(id: string, dto: UpdateDocumentalEstudianteDto) {
    const record = await this.model.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true },
    );
    if (!record) throw new NotFoundException('Expediente documental no encontrado');

    const nivelActual = await this.getNivelActual(record.studentId.toString());
    return { ...record.toObject(), nivelActual };
  }
}
