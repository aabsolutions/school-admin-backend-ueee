import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/schemas/user.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
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

    try {
      // If credentials provided, create a linked User account
      if (username && password) {
        const user = new this.userModel({
          username,
          password,
          name: teacherData.name,
          email: teacherData.email,
          role: Role.Teacher,
          permissions: ['canEdit', 'canRead'],
          isActive: true,
        });
        const savedUser = await user.save();
        const savedWithUser = await new this.teacherModel({ ...teacherData, userId: savedUser._id }).save();
      return savedWithUser.populate('departmentId', 'departmentName');
      }

      const saved = await new this.teacherModel(teacherData).save();
      return saved.populate('departmentId', 'departmentName');
    } catch (err) {
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
}
