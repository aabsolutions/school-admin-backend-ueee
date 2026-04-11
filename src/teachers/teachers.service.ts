import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/schemas/user.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateTeacherFamilyInfoDto } from './dto/update-family-info.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.teacherModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<TeacherDocument> {
    const teacher = await this.teacherModel.findById(id).populate('departmentId', 'departmentName');
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: CreateTeacherDto): Promise<TeacherDocument> {
    const { username, password, ...teacherData } = dto;

    // Credenciales: las explícitas del DTO tienen prioridad; si no, se usa la cédula como default
    const resolvedUsername = username ?? teacherData.dni ?? teacherData.email;
    const resolvedPassword = password ?? teacherData.dni ?? teacherData.email;

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
      return saved.populate('departmentId', 'departmentName');
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
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('departmentId', 'departmentName');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.teacherModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Teacher not found');
  }

  async findByUserId(userId: string): Promise<TeacherDocument> {
    // Intento 1: buscar por userId (docentes creados con el nuevo flujo)
    let teacher = await this.teacherModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('departmentId', 'departmentName');

    // Intento 2: fallback por email (docentes migrados sin userId)
    if (!teacher) {
      const user = await this.userModel.findById(userId).select('email').exec();
      if (user) {
        teacher = await this.teacherModel
          .findOne({ email: user.email })
          .populate('departmentId', 'departmentName');
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

  async updateMedicalInfo(id: string, dto: UpdateTeacherMedicalInfoDto): Promise<TeacherDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`medicalInfo.${key}`] = val;
    }
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, { $set: update }, { new: true })
      .populate('departmentId', 'departmentName');
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async updateFamilyInfo(id: string, dto: UpdateTeacherFamilyInfoDto): Promise<TeacherDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`familyInfo.${key}`] = val;
    }
    const updated = await this.teacherModel
      .findByIdAndUpdate(id, { $set: update }, { new: true })
      .populate('departmentId', 'departmentName');
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
      .sort({ name: 1 })
      .exec();
  }
}
