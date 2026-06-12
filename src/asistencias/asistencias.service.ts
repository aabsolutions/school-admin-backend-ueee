import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AttendanceAssignment,
  AttendanceAssignmentDocument,
} from './schemas/attendance-assignment.schema';
import {
  AttendanceRecord,
  AttendanceRecordDocument,
} from './schemas/attendance-record.schema';
import {
  CursoLectivo,
  CursoLectivoDocument,
} from '../curso-lectivo/schemas/curso-lectivo.schema';
import { Enrollment, EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';
import { Parent, ParentDocument } from '../parents/schemas/parent.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { CommunicadosService } from '../communicados/communicados.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SaveAttendanceDto } from './dto/save-attendance.dto';
import { AttendanceQueryDto } from './dto/attendance-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ReporteMasivoQueryDto } from './dto/reporte-masivo-query.dto';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(AttendanceAssignment.name)
    private readonly assignmentModel: Model<AttendanceAssignmentDocument>,
    @InjectModel(AttendanceRecord.name)
    private readonly recordModel: Model<AttendanceRecordDocument>,
    @InjectModel(CursoLectivo.name)
    private readonly cursoLectivoModel: Model<CursoLectivoDocument>,
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly communicadosService: CommunicadosService,
  ) {}

  // ─── CONFIG ────────────────────────────────────────────────────────────────

  async createAssignment(dto: CreateAssignmentDto) {
    const cursoLectivo = await this.cursoLectivoModel
      .findById(dto.cursoLectivoId)
      .lean();
    if (!cursoLectivo)
      throw new NotFoundException('CursoLectivo no encontrado');

    const existing = await this.assignmentModel
      .findOne({ cursoLectivoId: new Types.ObjectId(dto.cursoLectivoId) })
      .lean();

    if (existing && existing.userId.toString() !== dto.userId) {
      throw new ConflictException('Este curso ya tiene un registrador asignado');
    }

    return this.assignmentModel
      .findOneAndUpdate(
        { cursoLectivoId: new Types.ObjectId(dto.cursoLectivoId) },
        {
          userId: new Types.ObjectId(dto.userId),
          cursoId: cursoLectivo.cursoId,
          isActive: true,
        },
        { upsert: true, new: true },
      )
      .populate('userId', 'name username role')
      .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
      .lean();
  }

  async findAllAssignments(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const [data, total] = await Promise.all([
      this.assignmentModel
        .find()
        .populate('userId', 'name username role')
        .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.assignmentModel.countDocuments(),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async deleteAssignment(id: string): Promise<void> {
    const result = await this.assignmentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Asignación no encontrada');
  }

  // ─── REGISTRO ──────────────────────────────────────────────────────────────

  async getMyAssignment(userId: string) {
    const assignment = await this.assignmentModel
      .findOne({ userId: new Types.ObjectId(userId), isActive: true })
      .populate('userId', 'name username role')
      .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
      .sort({ createdAt: -1 })
      .lean();

    if (!assignment) throw new NotFoundException('No tenés un curso asignado');

    const rawClId = (assignment.cursoLectivoId as any)._id ?? assignment.cursoLectivoId;
    const cursoLectivoOid = new Types.ObjectId(rawClId.toString());

    const enrollments = await this.enrollmentModel
      .find({ cursoLectivoId: cursoLectivoOid, status: 'enrolled' })
      .populate('studentId', 'name dni')
      .lean();

    const students = enrollments
      .map((e) => e.studentId as any)
      .sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', 'es', { sensitivity: 'base' }));

    return {
      ...assignment,
      students,
    };
  }

  async saveAttendance(dto: SaveAttendanceDto, takenByUserId: string) {
    const date = new Date(dto.date);
    date.setUTCHours(0, 0, 0, 0);

    const cursoLectivo = await this.cursoLectivoModel
      .findById(dto.cursoLectivoId)
      .lean();
    if (!cursoLectivo)
      throw new NotFoundException('CursoLectivo no encontrado');

    const records = dto.records.map((r) => ({
      studentId: new Types.ObjectId(r.studentId),
      status: r.status ?? 'present',
      note: r.note ?? '',
    }));

    const saved = await this.recordModel.findOneAndUpdate(
      { cursoLectivoId: new Types.ObjectId(dto.cursoLectivoId), date },
      {
        cursoId: cursoLectivo.cursoId,
        takenByUserId: new Types.ObjectId(takenByUserId),
        records,
      },
      { upsert: true, new: true },
    );

    const absentIds = records
      .filter((r) => r.status === 'absent')
      .map((r) => r.studentId.toString());

    if (absentIds.length) {
      this.createAbsenceCommunicados(absentIds, date, takenByUserId).catch(
        () => {},
      );
    }

    return { record: saved, absentCount: absentIds.length };
  }

  private async createAbsenceCommunicados(
    studentIds: string[],
    date: Date,
    takenByUserId: string,
  ) {
    await Promise.all(
      studentIds.map((id) =>
        this.communicadosService
          .createFromAbsence(id, date, takenByUserId)
          .catch(() => {}),
      ),
    );
  }

  async getMyRecords(userId: string, query: AttendanceQueryDto) {
    const { page = 1, limit = 10, dateFrom, dateTo } = query;

    const assignment = await this.assignmentModel
      .findOne({ userId: new Types.ObjectId(userId), isActive: true })
      .lean();
    if (!assignment) throw new NotFoundException('No tenés un curso asignado');

    const filter: any = { cursoLectivoId: assignment.cursoLectivoId };
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    const [data, total] = await Promise.all([
      this.recordModel
        .find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.recordModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── INSTITUCIONAL ─────────────────────────────────────────────────────────

  async findAllRecords(query: AttendanceQueryDto) {
    const { page = 1, limit = 10, cursoLectivoId, dateFrom, dateTo, studentId } = query;
    const filter: any = {};

    if (cursoLectivoId)
      filter.cursoLectivoId = new Types.ObjectId(cursoLectivoId);
    if (studentId)
      filter['records.studentId'] = new Types.ObjectId(studentId);
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    const [data, total] = await Promise.all([
      this.recordModel
        .find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.recordModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getConsolidated(
    cursoLectivoId: string,
    dateFrom?: string,
    dateTo?: string,
  ) {
    if (!cursoLectivoId)
      throw new NotFoundException('cursoLectivoId requerido');

    const match: any = {
      cursoLectivoId: new Types.ObjectId(cursoLectivoId),
    };
    if (dateFrom || dateTo) {
      match.date = {};
      if (dateFrom) match.date.$gte = new Date(dateFrom);
      if (dateTo) match.date.$lte = new Date(dateTo);
    }

    const [totalDays, entriesAgg] = await Promise.all([
      this.recordModel.countDocuments(match),
      this.recordModel.aggregate([
        { $match: match },
        { $unwind: '$records' },
        {
          $group: {
            _id: '$records.studentId',
            present: {
              $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] },
            },
            absent: {
              $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] },
            },
            late: {
              $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] },
            },
            excused: {
              $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] },
            },
          },
        },
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: '_id',
            as: 'student',
          },
        },
        { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            studentId: '$_id',
            name: '$student.name',
            dni: '$student.dni',
            present: 1,
            absent: 1,
            late: 1,
            excused: 1,
          },
        },
        { $sort: { absent: -1 } },
      ]),
    ]);

    const totalStudents = entriesAgg.length;
    const totalPresences = entriesAgg.reduce((s, e) => s + e.present + e.late, 0);
    const totalAbsences = entriesAgg.reduce((s, e) => s + e.absent, 0);
    const totalPossible = totalStudents * totalDays;

    return {
      totalDays,
      totalStudents,
      totalPresences,
      totalAbsences,
      attendanceRate:
        totalPossible > 0
          ? Math.round((totalPresences / totalPossible) * 100)
          : 100,
      students: entriesAgg,
    };
  }

  // ─── ESTUDIANTE ────────────────────────────────────────────────────────────

  async getStudentHistory(studentId: string, query: AttendanceQueryDto) {
    const { page = 1, limit = 20, cursoLectivoId, dateFrom, dateTo } = query;
    const match: any = {
      'records.studentId': new Types.ObjectId(studentId),
    };
    if (cursoLectivoId)
      match.cursoLectivoId = new Types.ObjectId(cursoLectivoId);
    if (dateFrom || dateTo) {
      match.date = {};
      if (dateFrom) match.date.$gte = new Date(dateFrom);
      if (dateTo) match.date.$lte = new Date(dateTo);
    }

    const studentOid = new Types.ObjectId(studentId);

    const [data, total] = await Promise.all([
      this.recordModel.aggregate([
        { $match: match },
        { $sort: { date: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $project: {
            date: 1,
            cursoLectivoId: 1,
            entry: {
              $first: {
                $filter: {
                  input: '$records',
                  cond: { $eq: ['$$this.studentId', studentOid] },
                },
              },
            },
          },
        },
      ]),
      this.recordModel.countDocuments(match),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── REPRESENTANTE ─────────────────────────────────────────────────────────

  async getMyChildrenAttendance(parentUserId: string, query: AttendanceQueryDto) {
    const parent = await this.parentModel
      .findOne({ userId: new Types.ObjectId(parentUserId) })
      .select('studentIds')
      .lean();

    if (!parent)
      throw new NotFoundException('Perfil de representante no encontrado');
    if (!parent.studentIds?.length) return [];

    const { dateFrom, dateTo } = query;
    const studentOids = parent.studentIds.map(
      (id) => new Types.ObjectId(id.toString()),
    );

    const match: any = {
      'records.studentId': { $in: studentOids },
    };
    if (dateFrom || dateTo) {
      match.date = {};
      if (dateFrom) match.date.$gte = new Date(dateFrom);
      if (dateTo) match.date.$lte = new Date(dateTo);
    }

    return this.recordModel.aggregate([
      { $match: match },
      { $unwind: '$records' },
      { $match: { 'records.studentId': { $in: studentOids } } },
      {
        $group: {
          _id: '$records.studentId',
          present: {
            $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] },
          },
          absent: {
            $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] },
          },
          late: {
            $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] },
          },
          excused: {
            $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] },
          },
          recentRecords: {
            $push: {
              date: '$date',
              status: '$records.status',
              note: '$records.note',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: '_id',
          as: 'student',
        },
      },
      { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'studentId',
          as: 'enrollment',
          pipeline: [
            { $match: { status: 'enrolled' } },
            {
              $lookup: {
                from: 'cursolectivos',
                localField: 'cursoLectivoId',
                foreignField: '_id',
                as: 'cursoLectivo',
                pipeline: [
                  { $match: { status: 'active' } },
                  {
                    $lookup: {
                      from: 'cursos',
                      localField: 'cursoId',
                      foreignField: '_id',
                      as: 'curso',
                    },
                  },
                  { $unwind: { path: '$curso', preserveNullAndEmptyArrays: true } },
                ],
              },
            },
            { $unwind: { path: '$cursoLectivo', preserveNullAndEmptyArrays: true } },
            { $limit: 1 },
          ],
        },
      },
      { $unwind: { path: '$enrollment', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          studentId: '$_id',
          name: '$student.name',
          present: 1,
          absent: 1,
          late: 1,
          excused: 1,
          recentRecords: { $slice: ['$recentRecords', -10] },
          cursoNombre: {
            $cond: {
              if: '$enrollment.cursoLectivo.curso',
              then: {
                $concat: [
                  { $ifNull: ['$enrollment.cursoLectivo.curso.nivel', ''] },
                  ' ',
                  { $ifNull: ['$enrollment.cursoLectivo.curso.paralelo', ''] },
                  ' ',
                  { $ifNull: ['$enrollment.cursoLectivo.curso.jornada', ''] },
                ],
              },
              else: '',
            },
          },
          academicYear: { $ifNull: ['$enrollment.cursoLectivo.academicYear', ''] },
        },
      },
    ]);
  }

  async getMyChildrenHistory(
    parentUserId: string,
    studentId: string,
    query: AttendanceQueryDto,
  ) {
    const parent = await this.parentModel
      .findOne({ userId: new Types.ObjectId(parentUserId) })
      .select('studentIds')
      .lean();

    if (!parent) throw new NotFoundException('Perfil de representante no encontrado');

    const owns = (parent.studentIds ?? []).some(
      (id) => id.toString() === studentId,
    );
    if (!owns) throw new NotFoundException('Estudiante no encontrado');

    return this.getStudentHistory(studentId, query);
  }

  async getReporteMasivo(dto: ReporteMasivoQueryDto) {
    const { status, statuses, dateFrom, dateTo, minCount = 2, jornada } = dto;
    // Support both legacy `status` (single) and new `statuses` (multi)
    const resolvedStatuses: string[] =
      statuses && statuses.length > 0
        ? statuses
        : status
          ? [status]
          : ['absent'];

    const dateMatch: Record<string, Date> = {};
    if (dateFrom) dateMatch.$gte = new Date(dateFrom);
    if (dateTo) {
      const to = new Date(dateTo);
      to.setUTCHours(23, 59, 59, 999);
      dateMatch.$lte = to;
    }

    const pipeline: any[] = [];
    if (Object.keys(dateMatch).length) {
      pipeline.push({ $match: { date: dateMatch } });
    }
    pipeline.push(
      { $unwind: '$records' },
      { $match: { 'records.status': { $in: resolvedStatuses } } },
      { $group: { _id: '$records.studentId', count: { $sum: 1 } } },
      { $match: { count: { $gte: minCount } } },
    );

    const counts: Array<{ _id: Types.ObjectId; count: number }> =
      await this.recordModel.aggregate(pipeline);

    if (!counts.length) return [];

    const studentIds = counts.map((c) => c._id);
    const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));

    const students = await this.studentModel
      .find({ _id: { $in: studentIds } })
      .select('name dni')
      .lean();
    const studentMap = new Map(
      students.map((s) => [s._id.toString(), { name: s.name as string, dni: s.dni as string | undefined }]),
    );

    const enrollments = await this.enrollmentModel
      .find({ studentId: { $in: studentIds }, status: 'enrolled' })
      .sort({ createdAt: -1 })
      .populate({
        path: 'cursoLectivoId',
        populate: { path: 'cursoId', select: 'nivel paralelo jornada especialidad' },
      })
      .lean();

    const enrollmentMap = new Map<string, { cursoNombre: string; academicYear: string }>();
    for (const e of enrollments) {
      const sid = (e.studentId as Types.ObjectId).toString();
      if (enrollmentMap.has(sid)) continue;
      const cl = e.cursoLectivoId as any;
      const curso = cl?.cursoId as any;
      const cursoNombre = curso
        ? [curso.nivel, curso.paralelo, curso.especialidad, curso.jornada].filter(Boolean).join(' ')
        : '';
      enrollmentMap.set(sid, { cursoNombre, academicYear: cl?.academicYear ?? '' });
    }

    let result = studentIds.map((id) => {
      const sid = id.toString();
      const student = studentMap.get(sid);
      const enrollment = enrollmentMap.get(sid);
      return {
        studentId: sid,
        name: student?.name ?? 'Desconocido',
        dni: student?.dni,
        cursoNombre: enrollment?.cursoNombre ?? '',
        academicYear: enrollment?.academicYear ?? '',
        count: countMap.get(sid) ?? 0,
      };
    });

    if (jornada) {
      result = result.filter((r) => r.cursoNombre.includes(jornada));
    }

    return result;
  }
}
