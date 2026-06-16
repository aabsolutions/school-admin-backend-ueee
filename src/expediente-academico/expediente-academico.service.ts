import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ExpedienteAcademico,
  ExpedienteAcademicoDocument,
} from './schemas/expediente-academico.schema';
import {
  ExpedienteAcademicoDocumento,
  ExpedienteAcademicoDocumentoDocument,
} from './schemas/expediente-academico-documento.schema';
import { CreateExpedienteAcademicoDocumentoDto } from './dto/create-expediente-academico-documento.dto';
import { UpdateExpedienteAcademicoDocumentoDto } from './dto/update-expediente-academico-documento.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { StudentsService } from '../students/students.service';
import { ParentsService } from '../parents/parents.service';
import { Student, StudentDocument } from '../students/schemas/student.schema';

@Injectable()
export class ExpedienteAcademicoService {
  constructor(
    @InjectModel(ExpedienteAcademico.name)
    private readonly expedienteModel: Model<ExpedienteAcademicoDocument>,
    @InjectModel(ExpedienteAcademicoDocumento.name)
    private readonly documentoModel: Model<ExpedienteAcademicoDocumentoDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly studentsService: StudentsService,
    private readonly parentsService: ParentsService,
  ) {}

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;

    // Query starts from students → left-join expediente → left-join docs count
    const matchStage: any[] = search
      ? [{
          $match: {
            $or: [
              { name:  { $regex: search, $options: 'i' } },
              { dni:   { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          },
        }]
      : [];

    const pipeline: any[] = [
      ...matchStage,
      {
        $lookup: {
          from: 'expedienteacademicos',
          localField: '_id',
          foreignField: 'studentId',
          as: 'expediente',
        },
      },
      {
        $addFields: {
          expediente: { $arrayElemAt: ['$expediente', 0] },
        },
      },
      {
        $lookup: {
          from: 'expedienteacademicodocumentos',
          localField: 'expediente._id',
          foreignField: 'expedienteId',
          as: 'docs',
        },
      },
      {
        $addFields: {
          totalDocumentos: { $size: '$docs' },
          ultimaActividad: { $max: '$docs.createdAt' },
          expedienteId: '$expediente._id',
        },
      },
      { $project: { docs: 0, expediente: 0, password: 0 } },
      { $sort: { name: 1 } },
    ];

    const [countResult, data] = await Promise.all([
      this.studentModel.aggregate([...pipeline, { $count: 'total' }]),
      this.studentModel.aggregate([
        ...pipeline,
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),
    ]);

    const total = countResult[0]?.total ?? 0;
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getOrCreate(studentId: string): Promise<ExpedienteAcademicoDocument> {
    const existing = await this.expedienteModel.findOne({
      studentId: new Types.ObjectId(studentId),
    });
    if (existing) return existing;
    try {
      return await new this.expedienteModel({
        studentId: new Types.ObjectId(studentId),
      }).save();
    } catch (err: any) {
      if (err.code === 11000) {
        return this.expedienteModel.findOne({
          studentId: new Types.ObjectId(studentId),
        }) as any;
      }
      throw err;
    }
  }

  async findByStudent(studentId: string) {
    const expediente = await this.expedienteModel
      .findOne({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', 'name email dni gender mobile img')
      .exec();
    if (!expediente) return { expediente: null, documentos: [] };
    const documentos = await this.documentoModel
      .find({ expedienteId: expediente._id })
      .sort({ seccion: 1, createdAt: 1 })
      .exec();
    return { expediente, documentos };
  }

  async findMyExpediente(userId: string) {
    let student: any;
    try {
      student = await this.studentsService.findByUserId(userId);
    } catch {
      return { expediente: null, documentos: [] };
    }
    return this.findByStudent(student._id.toString());
  }

  async findHijoExpediente(parentUserId: string, studentId: string) {
    const parent = await this.parentsService.findByUserId(parentUserId);
    const parentId = (parent as any)._id.toString();

    // studentIds is populated → compare via _id; fallback to raw ObjectId
    const inStudentIds = (parent.studentIds as any[]).some((s: any) => {
      const id = s?._id ?? s;
      return id?.toString() === studentId;
    });

    if (!inStudentIds) {
      // Also accept students linked via fatherId / motherId / guardianId on the Student doc
      const student = await this.studentsService.findOne(studentId).catch(() => null);
      const linked = student && [
        student.fatherId?.toString(),
        student.motherId?.toString(),
        student.guardianId?.toString(),
      ].filter(Boolean).includes(parentId);
      if (!linked) throw new ForbiddenException('No tenés acceso al expediente de este estudiante');
    }

    return this.findByStudent(studentId);
  }

  async getSeccionesGlobales(): Promise<string[]> {
    const result: string[] = await this.documentoModel.distinct('seccion');
    return result.sort((a, b) => a.localeCompare(b));
  }

  async getSeccionesStats(): Promise<{ nombre: string; count: number }[]> {
    const result = await this.documentoModel.aggregate([
      { $group: { _id: '$seccion', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return result.map((r) => ({ nombre: r._id as string, count: r.count as number }));
  }

  async deleteSeccionGlobal(seccionName: string): Promise<{ deleted: number }> {
    const res = await this.documentoModel.deleteMany({ seccion: seccionName });
    return { deleted: res.deletedCount };
  }

  async getDocumentos(expedienteId: string) {
    const expediente = await this.expedienteModel.findById(expedienteId);
    if (!expediente) throw new NotFoundException('Expediente no encontrado');
    return this.documentoModel
      .find({ expedienteId: new Types.ObjectId(expedienteId) })
      .sort({ seccion: 1, createdAt: 1 })
      .exec();
  }

  async addDocumento(
    expedienteId: string,
    dto: CreateExpedienteAcademicoDocumentoDto,
  ): Promise<ExpedienteAcademicoDocumentoDocument> {
    const expediente = await this.expedienteModel.findById(expedienteId);
    if (!expediente) throw new NotFoundException('Expediente no encontrado');
    return new this.documentoModel({
      expedienteId: new Types.ObjectId(expedienteId),
      seccion:     dto.seccion,
      nombre:      dto.nombre,
      url:         dto.url,
      descripcion: dto.descripcion,
      creadoPor:   dto.creadoPor,
      fecha:       dto.fecha ? new Date(dto.fecha) : new Date(),
    }).save();
  }

  async updateDocumento(
    expedienteId: string,
    docId: string,
    dto: UpdateExpedienteAcademicoDocumentoDto,
  ): Promise<ExpedienteAcademicoDocumentoDocument> {
    const update: any = { ...dto };
    if (dto.fecha) update.fecha = new Date(dto.fecha);

    const doc = await this.documentoModel.findOneAndUpdate(
      { _id: docId, expedienteId: new Types.ObjectId(expedienteId) },
      { $set: update },
      { new: true },
    );
    if (!doc) throw new NotFoundException('Documento no encontrado');
    return doc;
  }

  async deleteDocumento(expedienteId: string, docId: string): Promise<void> {
    const result = await this.documentoModel.findOneAndDelete({
      _id: docId,
      expedienteId: new Types.ObjectId(expedienteId),
    });
    if (!result) throw new NotFoundException('Documento no encontrado');
  }

  async deleteSeccion(expedienteId: string, seccionName: string): Promise<void> {
    const expediente = await this.expedienteModel.findById(expedienteId);
    if (!expediente) throw new NotFoundException('Expediente no encontrado');
    await this.documentoModel.deleteMany({
      expedienteId: new Types.ObjectId(expedienteId),
      seccion: seccionName,
    });
  }

  async deleteExpediente(id: string): Promise<void> {
    const expediente = await this.expedienteModel.findByIdAndDelete(id);
    if (!expediente) throw new NotFoundException('Expediente no encontrado');
    await this.documentoModel.deleteMany({ expedienteId: new Types.ObjectId(id) });
  }
}
