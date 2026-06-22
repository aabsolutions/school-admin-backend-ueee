import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/schemas/user.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { BulkTeacherItemDto } from './dto/bulk-create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateTeacherFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateTeacherGeneralDto } from './dto/update-teacher-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const [data, total] = await Promise.all([
      this.teacherModel
        .find(filter)
        .populate('departmentId', 'departmentName')
        .populate('areaEstudioId', 'nombre')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.teacherModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<TeacherDocument> {
    const teacher = await this.teacherModel.findById(id).populate('departmentId', 'departmentName').populate('areaEstudioId', 'nombre');
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: CreateTeacherDto): Promise<TeacherDocument> {
    const { username, password, ...teacherData } = dto;

    const resolvedEmail = teacherData.email?.trim() || `${(teacherData.dni ?? 'docente').replace(/\s/g, '')}@escuela.local`;
    teacherData.email = resolvedEmail;

    let resolvedUsername: string;
    if (username) {
      resolvedUsername = username;
    } else {
      const cand = this.resolveUsername(teacherData.name);
      const exists = await this.userModel.exists({ username: cand.primary });
      resolvedUsername = exists ? cand.fallback : cand.primary;
    }
    const resolvedPassword = password ?? resolvedUsername;

    let savedUser: any = null;
    try {
      const user = new this.userModel({
        username: resolvedUsername,
        password: resolvedPassword,
        name: teacherData.name,
        email: teacherData.email,
        role: Role.Teacher,
        permissions: ['canEdit', 'canRead'],
        isActive: true,
      });
      savedUser = await user.save();
      const saved = await new this.teacherModel({ ...teacherData, userId: savedUser._id }).save();
      return (await saved.populate('departmentId', 'departmentName')).populate('areaEstudioId', 'nombre');
    } catch (err: any) {
      // Rollback del usuario si el docente falló
      if (savedUser) await this.userModel.findByIdAndDelete(savedUser._id).catch(() => {});
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw new ConflictException(`Ya existe un docente con ese ${field}`);
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateTeacherDto): Promise<TeacherDocument> {
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, dto, { returnDocument: 'after' })
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.teacherModel.findByIdAndDelete(id).select('userId').lean();
    if (!teacher) throw new NotFoundException('Teacher not found');
    if (teacher.userId) {
      await this.userModel.findByIdAndDelete(teacher.userId).catch(() => {});
    }
  }

  async removeBulk(ids: string[]): Promise<{ deleted: number }> {
    const teachers = await this.teacherModel.find({ _id: { $in: ids } }).select('userId').lean();
    const userIds = (teachers as any[]).map((t) => t.userId).filter(Boolean);
    const result = await this.teacherModel.deleteMany({ _id: { $in: ids } });
    if (userIds.length) {
      await this.userModel.deleteMany({ _id: { $in: userIds } });
    }
    return { deleted: result.deletedCount };
  }

  async findByUserId(userId: string): Promise<TeacherDocument> {
    // Intento 1: buscar por userId (docentes creados con el nuevo flujo)
    let teacher = await this.teacherModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre');

    // Intento 2: fallback por email (docentes migrados sin userId)
    if (!teacher) {
      const user = await this.userModel.findById(userId).select('email').exec();
      if (user) {
        teacher = await this.teacherModel
          .findOne({ email: user.email })
          .populate('departmentId', 'departmentName')
          .populate('areaEstudioId', 'nombre');
        // Vincular userId para que la próxima vez sea directo
        if (teacher) {
          teacher.userId = new Types.ObjectId(userId) as any;
          await teacher.save();
        }
      }
    }

    if (!teacher) throw new NotFoundException('Teacher profile not found');
    return teacher;
  }

  async updateGeneralInfo(id: string, dto: UpdateTeacherGeneralDto): Promise<TeacherDocument> {
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, { $set: dto }, { returnDocument: 'after' })
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async updateMedicalInfo(id: string, dto: UpdateTeacherMedicalInfoDto): Promise<TeacherDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`medicalInfo.${key}`] = val;
    }
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after' })
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async updateFamilyInfo(id: string, dto: UpdateTeacherFamilyInfoDto): Promise<TeacherDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`familyInfo.${key}`] = val;
    }
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after' })
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async getReporteMedico(filters: {
    hasDisability?: string;
    hasAllergies?: string;
    hasChronicCondition?: string;
    hasConadis?: string;
    bloodType?: string;
    maritalStatus?: string;
    numberOfChildren?: string;
  }) {
    const match: Record<string, any> = {};

    if (filters.hasDisability !== undefined)
      match['medicalInfo.hasDisability'] = filters.hasDisability === 'true';
    if (filters.hasAllergies !== undefined)
      match['medicalInfo.hasAllergies'] = filters.hasAllergies === 'true';
    if (filters.hasChronicCondition !== undefined)
      match['medicalInfo.hasChronicCondition'] = filters.hasChronicCondition === 'true';
    if (filters.hasConadis !== undefined)
      match['medicalInfo.hasConadis'] = filters.hasConadis === 'true';
    if (filters.bloodType)
      match['medicalInfo.bloodType'] = filters.bloodType;
    if (filters.maritalStatus)
      match['familyInfo.maritalStatus'] = filters.maritalStatus;
    if (filters.numberOfChildren !== undefined)
      match['familyInfo.numberOfChildren'] = Number(filters.numberOfChildren);

    return this.teacherModel.find(match)
      .select('name dni mobile address gender birthdate status laboralDependency salarialCategory medicalInfo familyInfo')
      .populate('departmentId', 'departmentName')
      .populate('areaEstudioId', 'nombre')
      .sort({ name: 1 })
      .exec();
  }

  async checkBulkDuplicates(dnis: string[], emails: string[]): Promise<{ duplicateDnis: string[]; duplicateEmails: string[] }> {
    const [byDni, byEmail] = await Promise.all([
      dnis.length ? this.teacherModel.find({ dni: { $in: dnis } }).select('dni').lean() : [],
      emails.length ? this.teacherModel.find({ email: { $in: emails.map((e) => e.toLowerCase()) } }).select('email').lean() : [],
    ]);
    return {
      duplicateDnis: byDni.map((t: any) => t.dni),
      duplicateEmails: byEmail.map((t: any) => t.email),
    };
  }

  async bulkCreate(records: BulkTeacherItemDto[]): Promise<any> {
    const candidates = records.map((r) => this.resolveUsername(r.name));
    const allPrimaries = [...new Set(candidates.map((c) => c.primary))];
    const existingUsers = await this.userModel
      .find({ username: { $in: allPrimaries } })
      .select('username')
      .lean();
    const existingSet = new Set(existingUsers.map((u: any) => u.username));
    const usedInBatch = new Set<string>();

    const created: any[] = [];
    const failed: { row: number; data: any; error: string }[] = [];

    const medicalKeys: (keyof BulkTeacherItemDto)[] = [
      'bloodType', 'hasAllergies', 'allergiesDetail', 'hasChronicCondition',
      'chronicConditionDetail', 'currentMedications', 'hasDisability', 'disabilityDetail',
      'hasConadis', 'conadisNumber', 'healthInsurance', 'policyNumber',
    ];
    const familyKeys: (keyof BulkTeacherItemDto)[] = [
      'maritalStatus', 'spouseName', 'spouseOccupation', 'spouseMobile',
      'numberOfChildren', 'childrenAges', 'housingType',
    ];

    for (let i = 0; i < records.length; i++) {
      try {
        const record = records[i];
        const cand = candidates[i];
        const username =
          !existingSet.has(cand.primary) && !usedInBatch.has(cand.primary)
            ? cand.primary
            : cand.fallback;
        usedInBatch.add(username);

        const email = record.email?.trim() || `${record.dni.replace(/\s/g, '')}@escuela.local`;
        const teacher = await this.create({ ...record, email, username, password: username } as CreateTeacherDto);
        const id = teacher._id.toString();

        const medicalPayload = Object.fromEntries(
          medicalKeys.filter((k) => record[k] !== undefined).map((k) => [k, record[k]])
        );
        const familyPayload = Object.fromEntries(
          familyKeys.filter((k) => record[k] !== undefined).map((k) => [k, record[k]])
        );

        await Promise.all([
          Object.keys(medicalPayload).length ? this.updateMedicalInfo(id, medicalPayload) : Promise.resolve(),
          Object.keys(familyPayload).length ? this.updateFamilyInfo(id, familyPayload) : Promise.resolve(),
        ]);

        created.push(teacher);
      } catch (e: any) {
        failed.push({ row: i + 2, data: records[i], error: e.message ?? 'Error desconocido' });
      }
    }
    return { total: records.length, successCount: created.length, failureCount: failed.length, created, failed };
  }

  private resolveUsername(name: string): { primary: string; fallback: string } {
    const words = name.trim().split(/\s+/).map((w) => this.normalizeForUsername(w));
    const w0 = words[0] ?? '';
    const w2 = words[2] ?? w0;
    const w3 = words[3] ?? w2;
    return { primary: `${w2}.${w0}`, fallback: `${w3}.${w0}` };
  }

  private normalizeForUsername(str: string): string {
    return str
      .toLowerCase()
      .replace(/ñ/g, 'n')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  async uploadPhoto(
    id: string,
    file: Express.Multer.File,
    type: 'credencial' | 'cuerpo',
    peso?: number,
    talla?: number,
  ): Promise<TeacherDocument> {
    const folder = type === 'credencial' ? 'teachers/credencial' : 'teachers/cuerpo';
    const url = await this.cloudinaryService.uploadBuffer(file.buffer, folder);
    const update: any = type === 'credencial'
      ? { img: url }
      : { imgCuerpoEntero: url, ...(peso != null && { peso }), ...(talla != null && { talla }) };
    const updated = await this.teacherModel.findByIdAndUpdate(id, update, { returnDocument: 'after' });
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }
}
