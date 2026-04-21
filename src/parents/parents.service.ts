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
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
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
  ) {}

  async create(dto: CreateParentDto): Promise<ParentDocument> {
    const { username, password, studentIds, ...parentData } = dto;

    const resolvedUsername = username ?? dto.dni ?? dto.email;
    const resolvedPassword = password ?? dto.dni ?? dto.email;

    let savedUser: UserDocument | null = null;
    try {
      const user = new this.userModel({
        username: resolvedUsername,
        password: resolvedPassword,
        name: parentData.name,
        email: parentData.email,
        role: Role.Parent,
        permissions: ['canRead'],
        isActive: true,
      });
      savedUser = await user.save();

      const parent = await new this.parentModel({
        ...parentData,
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
    const filter: any = {};
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
    await Promise.all([
      this.parentModel.findByIdAndUpdate(id, { isActive: false }),
      this.userModel.findByIdAndUpdate(parent.userId, { isActive: false }),
    ]);
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
