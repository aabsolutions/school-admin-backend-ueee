import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CursoLectivo, CursoLectivoDocument } from './schemas/curso-lectivo.schema';
import { CreateCursoLectivoDto } from './dto/create-curso-lectivo.dto';
import { UpdateCursoLectivoDto } from './dto/update-curso-lectivo.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TeachersService } from '../teachers/teachers.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';

@Injectable()
export class CursoLectivoService {
  private readonly logger = new Logger(CursoLectivoService.name);

  constructor(
    @InjectModel(CursoLectivo.name)
    private readonly cursoLectivoModel: Model<CursoLectivoDocument>,
    private readonly teachersService: TeachersService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  async findAll(query: PaginationQueryDto & { academicYear?: string; status?: string; cursoId?: string }) {
    const { page = 1, limit = 10, sortBy = 'academicYear', sortOrder = 'desc', academicYear, status, cursoId } = query;

    const filter: any = {};
    if (academicYear) filter.academicYear = academicYear;
    if (status) filter.status = status;
    if (cursoId) filter.cursoId = cursoId;

    const [data, total] = await Promise.all([
      this.cursoLectivoModel
        .find(filter)
        .populate('cursoId', 'nivel especialidad paralelo jornada')
        .populate('tutorId', 'name email')
        .populate('inspectorId', 'name email')
        .populate('psicologoId', 'name email')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.cursoLectivoModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<CursoLectivoDocument> {
    const cl = await this.cursoLectivoModel
      .findById(id)
      .populate('cursoId', 'nivel especialidad paralelo jornada status')
      .populate('tutorId', 'name email mobile')
      .populate('inspectorId', 'name email mobile')
      .populate('psicologoId', 'name email mobile');
    if (!cl) throw new NotFoundException('Curso lectivo no encontrado');
    return cl;
  }

  async create(dto: CreateCursoLectivoDto): Promise<CursoLectivoDocument> {
    try {
      const saved = await new this.cursoLectivoModel(dto).save();
      return this.findOne(saved._id.toString());
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un año lectivo para ese curso');
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateCursoLectivoDto): Promise<CursoLectivoDocument> {
    try {
      const updated = await this.cursoLectivoModel.findByIdAndUpdate(id, dto, { new: true });
      if (!updated) throw new NotFoundException('Curso lectivo no encontrado');
      return this.findOne(id);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un año lectivo para ese curso');
      }
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.cursoLectivoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Curso lectivo no encontrado');
  }

  async findTutorAlumnos(userId: string) {
    let teacher: any;
    try {
      teacher = await this.teachersService.findByUserId(userId);
    } catch (err) {
      return { cursoLectivo: null, estudiantes: [] };
    }

    const teacherIdStr = teacher._id.toString();
    const cursoLectivo = await this.cursoLectivoModel
      .findOne({ $or: [{ tutorId: teacher._id }, { tutorId: teacherIdStr }] })
      .populate('cursoId', 'nivel especialidad paralelo jornada subnivel')
      .populate('tutorId', 'name email')
      .sort({ createdAt: -1 })
      .exec();

    if (!cursoLectivo) return { cursoLectivo: null, estudiantes: [] };

    const result = await this.enrollmentsService.findAll({
      cursoLectivoId: cursoLectivo._id.toString(),
      limit: 500,
      page: 1,
      sortBy: 'enrolledAt',
      sortOrder: 'asc',
      status: 'enrolled',
    });

    const estudiantes = result.data.map((e: any) => {
      const s = e.studentId ?? {};
      return {
        dni:       s.dni       ?? '',
        name:      s.name      ?? '',
        email:     s.email     ?? '',
        gender:    s.gender    ?? '',
        birthdate: s.birthdate ?? null,
        mobile:    s.mobile    ?? '',
      };
    });

    return { cursoLectivo, estudiantes };
  }
}
