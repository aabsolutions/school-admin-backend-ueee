import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Parent, ParentDocument } from './schemas/parent.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { User, UserDocument, Role } from '../users/schemas/user.schema';
import { Enrollment, EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';
import { Expediente, ExpedienteDocument } from '../expedientes/schemas/expediente.schema';
import { ExpedienteRegistro, ExpedienteRegistroDocument } from '../expedientes/schemas/expediente-registro.schema';
import { DeceExpediente, DeceExpedienteDocument } from '../dece/schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroDocument } from '../dece/schemas/dece-registro.schema';
import { AttendanceRecord, AttendanceRecordDocument } from '../asistencias/schemas/attendance-record.schema';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { BulkParentItemDto, BulkParentImportResult } from './dto/bulk-create-parent.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Expediente.name)
    private readonly expedienteModel: Model<ExpedienteDocument>,
    @InjectModel(ExpedienteRegistro.name)
    private readonly expedienteRegistroModel: Model<ExpedienteRegistroDocument>,
    @InjectModel(DeceExpediente.name)
    private readonly deceExpedienteModel: Model<DeceExpedienteDocument>,
    @InjectModel(DeceRegistro.name)
    private readonly deceRegistroModel: Model<DeceRegistroDocument>,
    @InjectModel(AttendanceRecord.name)
    private readonly attendanceRecordModel: Model<AttendanceRecordDocument>,
  ) {}

  async create(dto: CreateParentDto): Promise<ParentDocument> {
    const { username, password, studentIds, email: rawEmail, ...parentData } = dto;

    const email = rawEmail || `${dto.dni}@escuela.local`;
    const resolvedUsername = username ?? dto.dni;
    const resolvedPassword = password ?? dto.dni;

    let savedUser: UserDocument | null = null;
    try {
      const user = new this.userModel({
        username: resolvedUsername,
        password: resolvedPassword,
        name: parentData.name,
        email,
        role: Role.Parent,
        permissions: ['canRead'],
        isActive: true,
      });
      savedUser = await user.save();

      const parent = await new this.parentModel({
        ...parentData,
        email,
        userId: savedUser._id,
        studentIds: [],
      }).save();

      if (studentIds?.length) {
        await this._linkStudents(parent._id.toString(), studentIds);
        return this.findOne(parent._id.toString());
      }

      return parent;
    } catch (err: any) {
      if (savedUser) await this.userModel.findByIdAndDelete(savedUser._id).catch(() => {});
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw new ConflictException(`Ya existe un padre con ese ${field}`);
      }
      throw err;
    }
  }

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const filter: any = { isActive: true };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { dni: { $regex: search, $options: 'i' } },
      ];
    }
    const [data, total] = await Promise.all([
      this.parentModel
        .find(filter)
        .populate('studentIds', 'name email dni')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.parentModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<ParentDocument> {
    const parent = await this.parentModel
      .findById(id)
      .populate('studentIds', 'name email dni img status');
    if (!parent) throw new NotFoundException('Padre no encontrado');
    return parent;
  }

  async findByUserId(userId: string): Promise<ParentDocument> {
    const parent = await this.parentModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('studentIds', 'name email dni img status');
    if (!parent) throw new NotFoundException('Perfil de padre no encontrado');
    return parent;
  }

  async searchByName(q: string, studentId?: string) {
    const filter: any = { isActive: true };

    if (studentId) {
      const studentOid = new Types.ObjectId(studentId);
      filter.$or = [
        { studentIds: studentOid },
        // también cubre padres vinculados por los campos de rol en Student
      ];
      const student = await this.studentModel
        .findById(studentOid)
        .select('fatherId motherId guardianId')
        .lean();
      if (student) {
        const roleRefs = [student.fatherId, student.motherId, student.guardianId].filter(Boolean);
        if (roleRefs.length) {
          filter.$or = [{ studentIds: studentOid }, { _id: { $in: roleRefs } }];
        }
      }
    } else if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { dni: { $regex: q, $options: 'i' } },
      ];
    }

    return this.parentModel
      .find(filter)
      .select('name email dni mobile')
      .limit(20)
      .lean();
  }

  async getHijos(parentUserId: string) {
    const parent = await this.parentModel
      .findOne({ userId: new Types.ObjectId(parentUserId) })
      .lean();
    if (!parent) throw new NotFoundException('Perfil de padre no encontrado');

    const parentOid = parent._id as Types.ObjectId;

    // Busca estudiantes vinculados por studentIds O por los campos de rol directo
    const students = await this.studentModel
      .find({
        $or: [
          { _id: { $in: parent.studentIds ?? [] } },
          { fatherId: parentOid },
          { motherId: parentOid },
          { guardianId: parentOid },
        ],
      })
      .select('name email dni img imgCuerpoEntero gender birthdate address status mobile')
      .lean();

    // Sincroniza studentIds si había inconsistencias
    if (students.length && (parent.studentIds?.length ?? 0) !== students.length) {
      const ids = students.map((s) => s._id as Types.ObjectId);
      await this.parentModel.updateOne({ _id: parentOid }, { $set: { studentIds: ids } });
    }

    return students;
  }

  async getHijosActivos(parentUserId: string): Promise<Array<{ student: any; cursoNombre: string; academicYear: string }>> {
    const parent = await this.parentModel
      .findOne({ userId: new Types.ObjectId(parentUserId) })
      .lean();
    if (!parent) throw new NotFoundException('Perfil de padre no encontrado');

    const parentOid = parent._id as Types.ObjectId;
    const students = await this.studentModel
      .find({
        $or: [
          { _id: { $in: parent.studentIds ?? [] } },
          { fatherId: parentOid },
          { motherId: parentOid },
          { guardianId: parentOid },
        ],
      })
      .select('name email dni img gender status')
      .lean();

    if (!students.length) return [];

    const studentIds = students.map((s) => s._id as Types.ObjectId);

    const enrollments = await this.enrollmentModel.aggregate([
      { $match: { studentId: { $in: studentIds }, status: 'enrolled' } },
      {
        $lookup: {
          from: 'cursolectivos',
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
      {
        $project: {
          studentId: 1,
          academicYear: '$cursoLectivo.academicYear',
          cursoNombre: {
            $concat: ['$curso.nivel', ' ', '$curso.paralelo', ' ', '$curso.jornada'],
          },
        },
      },
    ]);

    const enrollmentMap = new Map(
      enrollments.map((e) => [e.studentId.toString(), { cursoNombre: e.cursoNombre, academicYear: e.academicYear }]),
    );

    return students.map((student) => {
      const enrollment = enrollmentMap.get((student._id as Types.ObjectId).toString());
      return {
        student,
        cursoNombre: enrollment?.cursoNombre ?? '',
        academicYear: enrollment?.academicYear ?? '',
      };
    });
  }

  async update(id: string, dto: UpdateParentDto): Promise<ParentDocument> {
    const parent = await this.parentModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .populate('studentIds', 'name email dni img status');
    if (!parent) throw new NotFoundException('Padre no encontrado');
    return parent;
  }

  async linkStudents(parentId: string, studentIds: string[]): Promise<ParentDocument> {
    await this._linkStudents(parentId, studentIds);
    return this.findOne(parentId);
  }

  async unlinkStudent(parentId: string, studentId: string): Promise<ParentDocument> {
    const parentOid = new Types.ObjectId(parentId);
    const studentOid = new Types.ObjectId(studentId);

    await Promise.all([
      this.parentModel.updateOne(
        { _id: parentOid },
        { $pull: { studentIds: studentOid } },
      ),
      this.studentModel.updateOne(
        { _id: studentOid },
        { $pull: { parentIds: parentOid } },
      ),
    ]);
    return this.findOne(parentId);
  }

  async remove(id: string): Promise<void> {
    const parent = await this.parentModel.findById(id);
    if (!parent) throw new NotFoundException('Padre no encontrado');
    const parentOid = parent._id as Types.ObjectId;
    await Promise.all([
      this.parentModel.findByIdAndUpdate(id, { isActive: false }),
      this.userModel.findByIdAndUpdate(parent.userId, { isActive: false }),
      // Pull parent from studentIds array
      this.studentModel.updateMany(
        { _id: { $in: parent.studentIds } },
        { $pull: { parentIds: parentOid } },
      ),
      // Null role-specific fields only where they point to this parent
      this.studentModel.updateMany(
        { fatherId: parentOid },
        { $set: { fatherId: null } },
      ),
      this.studentModel.updateMany(
        { motherId: parentOid },
        { $set: { motherId: null } },
      ),
      this.studentModel.updateMany(
        { guardianId: parentOid },
        { $set: { guardianId: null } },
      ),
    ]);
  }

  async checkBulkDuplicates(dnis: string[], emails: string[]): Promise<{ duplicateDnis: string[]; duplicateEmails: string[] }> {
    const [byDni, byEmail] = await Promise.all([
      dnis.length ? this.parentModel.find({ dni: { $in: dnis } }).select('dni').lean() : [],
      emails.length ? this.parentModel.find({ email: { $in: emails.map((e) => e.toLowerCase()) } }).select('email').lean() : [],
    ]);
    return {
      duplicateDnis: byDni.map((p: any) => p.dni),
      duplicateEmails: byEmail.map((p: any) => p.email),
    };
  }

  async bulkCreate(records: BulkParentItemDto[]): Promise<BulkParentImportResult> {
    const created: any[] = [];
    const failed: { row: number; data: any; error: string }[] = [];
    for (let i = 0; i < records.length; i++) {
      try {
        const record = records[i];
        const email = record.email?.trim() || `${(record.dni ?? '').replace(/\s/g, '')}@escuela.local`;
        const parent = await this.create({ ...record, email } as CreateParentDto);
        created.push(parent);
      } catch (e: any) {
        failed.push({ row: i + 2, data: records[i], error: e.message ?? 'Error desconocido' });
      }
    }
    return { total: records.length, successCount: created.length, failureCount: failed.length, created, failed };
  }

  async getHijosDashboard(parentUserId: string) {
    const students = await this.getHijos(parentUserId);
    if (!students.length) return [];

    const studentIds = students.map((s) => s._id as Types.ObjectId);

    // Enrollment + curso info via populate (same pattern used across the system)
    const enrollmentDocs = await this.enrollmentModel
      .find({ studentId: { $in: studentIds }, status: 'enrolled' })
      .sort({ createdAt: -1 })
      .populate({
        path: 'cursoLectivoId',
        populate: { path: 'cursoId', select: 'nivel paralelo jornada' },
      })
      .lean()
      .exec();

    const enrollmentMap = new Map<string, { cursoNombre: string; academicYear: string }>();
    for (const e of enrollmentDocs) {
      const sid = (e.studentId as Types.ObjectId).toString();
      if (enrollmentMap.has(sid)) continue; // sorted desc — first is most recent
      const cl = e.cursoLectivoId as any;
      const curso = cl?.cursoId as any;
      const cursoNombre = curso
        ? [curso.nivel, curso.paralelo, curso.jornada].filter(Boolean).join(' ')
        : '';
      enrollmentMap.set(sid, { cursoNombre, academicYear: cl?.academicYear ?? '' });
    }

    // Expediente IDs per student
    const expedientes = await this.expedienteModel
      .find({ studentId: { $in: studentIds } })
      .select('_id studentId')
      .lean();
    const expedienteIdMap = new Map(
      expedientes.map((e) => [e.studentId.toString(), (e._id as Types.ObjectId).toString()]),
    );
    const expedienteIds = expedientes.map((e) => e._id as Types.ObjectId);

    // DECE expediente IDs per student
    const deceExpedientes = await this.deceExpedienteModel
      .find({ studentId: { $in: studentIds } })
      .select('_id studentId')
      .lean();
    const deceExpedienteIdMap = new Map(
      deceExpedientes.map((e) => [e.studentId.toString(), (e._id as Types.ObjectId).toString()]),
    );
    const deceExpedienteIds = deceExpedientes.map((e) => e._id as Types.ObjectId);

    // Count registros per expediente
    const expRegCounts = await this.expedienteRegistroModel.aggregate([
      { $match: { expedienteId: { $in: expedienteIds } } },
      { $group: { _id: '$expedienteId', count: { $sum: 1 } } },
    ]);
    const expRegCountMap = new Map(expRegCounts.map((r) => [r._id.toString(), r.count]));

    const deceRegCounts = await this.deceRegistroModel.aggregate([
      { $match: { expedienteId: { $in: deceExpedienteIds } } },
      { $group: { _id: '$expedienteId', count: { $sum: 1 } } },
    ]);
    const deceRegCountMap = new Map(deceRegCounts.map((r) => [r._id.toString(), r.count]));

    // Attendance stats per student
    const attendanceAgg = await this.attendanceRecordModel.aggregate([
      { $match: { 'records.studentId': { $in: studentIds } } },
      { $unwind: '$records' },
      { $match: { 'records.studentId': { $in: studentIds } } },
      {
        $group: {
          _id: '$records.studentId',
          present: { $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] } },
          excused: { $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] } },
        },
      },
    ]);
    const attendanceMap = new Map(
      attendanceAgg.map((a) => [a._id.toString(), { present: a.present, absent: a.absent, late: a.late, excused: a.excused }]),
    );

    return students.map((student) => {
      const sid = (student._id as Types.ObjectId).toString();
      const enrollment = enrollmentMap.get(sid);
      const expId = expedienteIdMap.get(sid);
      const deceId = deceExpedienteIdMap.get(sid);
      const att = attendanceMap.get(sid) ?? { present: 0, absent: 0, late: 0, excused: 0 };
      const total = att.present + att.absent + att.late + att.excused;
      // tardanzas cuentan como asistido
      const attended = att.present + att.late;
      return {
        student,
        cursoNombre: enrollment?.cursoNombre ?? '',
        academicYear: enrollment?.academicYear ?? '',
        expedientesCount: expId ? (expRegCountMap.get(expId) ?? 0) : 0,
        deceCount: deceId ? (deceRegCountMap.get(deceId) ?? 0) : 0,
        attendanceStats: {
          ...att,
          rate: total > 0 ? Math.round((attended / total) * 100) : 0,
        },
      };
    });
  }

  private async _linkStudents(parentId: string, studentIds: string[]): Promise<void> {
    const parentOid = new Types.ObjectId(parentId);
    const studentOids = studentIds.map((s) => new Types.ObjectId(s));

    await Promise.all([
      this.parentModel.updateOne(
        { _id: parentOid },
        { $addToSet: { studentIds: { $each: studentOids } } },
      ),
      this.studentModel.updateMany(
        { _id: { $in: studentOids } },
        { $addToSet: { parentIds: parentOid } },
      ),
    ]);
  }
}
