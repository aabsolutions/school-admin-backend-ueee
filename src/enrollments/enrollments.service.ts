import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findAll(
    query: PaginationQueryDto & {
      studentId?: string;
      cursoLectivoId?: string;
      status?: string;
    },
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'enrolledAt',
      sortOrder = 'desc',
      studentId,
      cursoLectivoId,
      status,
    } = query;

    const filter: any = {};
    if (studentId) filter.studentId = new Types.ObjectId(studentId);
    if (cursoLectivoId) {
      const oid = new Types.ObjectId(cursoLectivoId);
      filter.$or = [{ cursoLectivoId: oid }, { cursoLectivoId: cursoLectivoId }];
    }
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      this.enrollmentModel
        .find(filter)
        .populate('studentId', 'name email dni gender birthdate mobile')
        .populate({
          path: 'cursoLectivoId',
          populate: { path: 'cursoId', select: 'nivel especialidad paralelo jornada' },
        })
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.enrollmentModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<EnrollmentDocument> {
    const enrollment = await this.enrollmentModel
      .findById(id)
      .populate('studentId', 'name email dni gender birthdate mobile')
      .populate({
        path: 'cursoLectivoId',
        populate: [
          { path: 'cursoId', select: 'nivel especialidad paralelo jornada' },
          { path: 'tutorId', select: 'name email' },
          { path: 'inspectorId', select: 'name email' },
          { path: 'psicologoId', select: 'name email' },
        ],
      });
    if (!enrollment) throw new NotFoundException('Matrícula no encontrada');
    return enrollment;
  }

  async create(dto: CreateEnrollmentDto): Promise<EnrollmentDocument> {
    try {
      const saved = await new this.enrollmentModel({
        ...dto,
        studentId:      new Types.ObjectId(dto.studentId),
        cursoLectivoId: new Types.ObjectId(dto.cursoLectivoId),
      }).save();
      this.notificationsService
        .createForStudentId(dto.studentId, 'enrollment', 'Nueva matrícula registrada',
          'Tu matrícula ha sido registrada en el sistema.', '/student/dashboard')
        .catch(() => {});
      return this.findOne(saved._id.toString());
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('El estudiante ya está matriculado en ese curso lectivo');
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateEnrollmentDto): Promise<EnrollmentDocument> {
    const updated = await this.enrollmentModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Matrícula no encontrada');
    return this.findOne(id);
  }

  async withdraw(id: string): Promise<EnrollmentDocument> {
    const updated = await this.enrollmentModel.findByIdAndUpdate(
      id,
      { status: 'withdrawn' },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Matrícula no encontrada');
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.enrollmentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Matrícula no encontrada');
  }

  async getStats(): Promise<{ cursoLectivoId: string; total: number; male: number; female: number }[]> {
    const enrollments = await this.enrollmentModel
      .find({ status: 'enrolled' })
      .select('cursoLectivoId studentId')
      .populate('studentId', 'gender')
      .lean()
      .exec();

    const map = new Map<string, { total: number; male: number; female: number }>();

    for (const e of enrollments) {
      const key    = (e.cursoLectivoId as any).toString();
      const gender = (e.studentId as any)?.gender ?? '';

      if (!map.has(key)) map.set(key, { total: 0, male: 0, female: 0 });
      const stat = map.get(key)!;
      stat.total++;
      if (gender === 'Male')   stat.male++;
      if (gender === 'Female') stat.female++;
    }

    return Array.from(map.entries()).map(([cursoLectivoId, s]) => ({ cursoLectivoId, ...s }));
  }
}
