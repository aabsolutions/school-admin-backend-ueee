import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/schemas/user.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
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
      this.studentModel
        .find(filter)
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
    const { username, password, ...studentData } = dto;

    try {
      // If credentials provided, create a linked User account
      if (username && password) {
        const user = new this.userModel({
          username,
          password,
          name: studentData.name,
          email: studentData.email,
          role: Role.Student,
          permissions: ['canRead'],
          isActive: true,
        });
        const savedUser = await user.save();
        return await new this.studentModel({ ...studentData, userId: savedUser._id }).save();
      }
      console.warn(studentData);
      return await new this.studentModel(studentData).save();
    } catch (err: any) {
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        throw new ConflictException(`Ya existe un estudiante con ese ${field}`);
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentDocument> {
    const updated = await this.studentModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
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
}
