import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/schemas/user.schema';
import { Parent, ParentDocument } from '../parents/schemas/parent.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateStudentMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateStudentFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateStudentGeneralDto } from './dto/update-student-general.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
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
      this.studentModel
        .find(filter)
        .populate('fatherId motherId guardianId', 'name email dni')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.studentModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<StudentDocument> {
    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto): Promise<StudentDocument> {
    const { username, password, fatherId, motherId, guardianId, ...studentData } = dto;

    const resolvedUsername = username ?? studentData.dni ?? studentData.email;
    const resolvedPassword = password ?? studentData.dni ?? studentData.email;

    const parentIds = this._deriveParentIds(fatherId, motherId, guardianId);

    let savedUser: any = null;
    try {
      const user = new this.userModel({
        username: resolvedUsername,
        password: resolvedPassword,
        name: studentData.name,
        email: studentData.email,
        role: Role.Student,
        permissions: ['canRead'],
        isActive: true,
      });
      savedUser = await user.save();
      const student = await new this.studentModel({
        ...studentData,
        userId: savedUser._id,
        fatherId: fatherId ? new Types.ObjectId(fatherId) : null,
        motherId: motherId ? new Types.ObjectId(motherId) : null,
        guardianId: guardianId ? new Types.ObjectId(guardianId) : null,
        parentIds: parentIds.map((p) => new Types.ObjectId(p)),
      }).save();

      if (parentIds.length) {
        const studentOid = student._id as Types.ObjectId;
        await this.parentModel.updateMany(
          { _id: { $in: parentIds.map((p) => new Types.ObjectId(p)) } },
          { $addToSet: { studentIds: studentOid } },
        );
      }

      return this.studentModel.findById(student._id).populate('fatherId motherId guardianId', 'name email dni') as Promise<StudentDocument>;
    } catch (err: any) {
      if (savedUser) await this.userModel.findByIdAndDelete(savedUser._id).catch(() => {});
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw new ConflictException(`Ya existe un estudiante con ese ${field}`);
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentDocument> {
    const { fatherId, motherId, guardianId, ...rest } = dto;

    const updateData: any = { ...rest };

    if (fatherId !== undefined || motherId !== undefined || guardianId !== undefined) {
      const current = await this.studentModel.findById(id).select('fatherId motherId guardianId parentIds').lean();
      if (!current) throw new NotFoundException('Student not found');

      const newFather = fatherId !== undefined ? fatherId : current.fatherId?.toString() ?? null;
      const newMother = motherId !== undefined ? motherId : current.motherId?.toString() ?? null;
      const newGuardian = guardianId !== undefined ? guardianId : current.guardianId?.toString() ?? null;

      const newParentIds = this._deriveParentIds(newFather, newMother, newGuardian);
      const oldParentIds: string[] = (current.parentIds ?? []).map((o: Types.ObjectId) => o.toString());

      const toAdd = newParentIds.filter((p) => !oldParentIds.includes(p));
      const toRemove = oldParentIds.filter((p) => !newParentIds.includes(p));

      const studentOid = new Types.ObjectId(id);
      await Promise.all([
        toAdd.length
          ? this.parentModel.updateMany({ _id: { $in: toAdd.map((p) => new Types.ObjectId(p)) } }, { $addToSet: { studentIds: studentOid } })
          : Promise.resolve(),
        toRemove.length
          ? this.parentModel.updateMany({ _id: { $in: toRemove.map((p) => new Types.ObjectId(p)) } }, { $pull: { studentIds: studentOid } })
          : Promise.resolve(),
      ]);

      updateData.fatherId = newFather ? new Types.ObjectId(newFather) : null;
      updateData.motherId = newMother ? new Types.ObjectId(newMother) : null;
      updateData.guardianId = newGuardian ? new Types.ObjectId(newGuardian) : null;
      updateData.parentIds = newParentIds.map((p) => new Types.ObjectId(p));
    }

    const updated = await this.studentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('fatherId motherId guardianId', 'name email dni');
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  private _deriveParentIds(
    fatherId?: string | null,
    motherId?: string | null,
    guardianId?: string | null,
  ): string[] {
    return [...new Set([fatherId, motherId, guardianId].filter(Boolean) as string[])];
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Student not found');
  }

  async toggleStatus(id: string, status: string): Promise<StudentDocument> {
    const updated = await this.studentModel.findByIdAndUpdate(
      id, { status }, { new: true },
    );
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async findByUserId(userId: string): Promise<StudentDocument> {
    // Intento 1: buscar por userId (estudiantes creados con el nuevo flujo)
    let student = await this.studentModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    // Intento 2: fallback por email (estudiantes migrados sin userId)
    if (!student) {
      const user = await this.userModel.findById(userId).select('email').exec();
      if (user) {
        student = await this.studentModel.findOne({ email: user.email });
        // Si lo encontramos, vincular el userId para que la próxima vez sea directo
        if (student) {
          student.userId = new Types.ObjectId(userId) as any;
          await student.save();
        }
      }
    }

    if (!student) throw new NotFoundException('Student profile not found');
    return student;
  }

  async updateGeneralInfo(id: string, dto: UpdateStudentGeneralDto): Promise<StudentDocument> {
    const updated = await this.studentModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async updateMedicalInfo(id: string, dto: UpdateStudentMedicalInfoDto): Promise<StudentDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`medicalInfo.${key}`] = val;
    }
    const updated = await this.studentModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async updateFamilyInfo(id: string, dto: UpdateStudentFamilyInfoDto): Promise<StudentDocument> {
    const update: Record<string, any> = {};
    for (const [key, val] of Object.entries(dto)) {
      update[`familyInfo.${key}`] = val;
    }
    const updated = await this.studentModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async getReporteMedico(filters: {
    hasDisability?: string;
    hasAllergies?: string;
    hasChronicCondition?: string;
    hasConadis?: string;
    bloodType?: string;
    familySituation?: string;
    socioeconomicLevel?: string;
    housingType?: string;
    numberOfSiblings?: string;
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
    if (filters.familySituation)
      match['familyInfo.familySituation'] = filters.familySituation;
    if (filters.socioeconomicLevel)
      match['familyInfo.socioeconomicLevel'] = filters.socioeconomicLevel;
    if (filters.housingType)
      match['familyInfo.housingType'] = filters.housingType;
    if (filters.numberOfSiblings !== undefined)
      match['familyInfo.numberOfSiblings'] = Number(filters.numberOfSiblings);

    return this.studentModel.find(match).select(
      'name dni mobile address gender birthdate status medicalInfo familyInfo parentGuardianName parentGuardianMobile'
    ).sort({ name: 1 }).exec();
  }

  async uploadPhoto(
    id: string,
    file: Express.Multer.File,
    type: 'credencial' | 'cuerpo',
    peso?: number,
    talla?: number,
  ): Promise<StudentDocument> {
    const folder = type === 'credencial' ? 'students/credencial' : 'students/cuerpo';
    const url = await this.cloudinaryService.uploadBuffer(file.buffer, folder);
    const update: any = type === 'credencial'
      ? { img: url }
      : { imgCuerpoEntero: url, ...(peso != null && { peso }), ...(talla != null && { talla }) };
    const updated = await this.studentModel.findByIdAndUpdate(id, update, { new: true });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }
}
