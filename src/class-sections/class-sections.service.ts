import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassSection, ClassSectionDocument } from './schemas/class-section.schema';
import { CreateClassSectionDto } from './dto/create-class-section.dto';
import { UpdateClassSectionDto } from './dto/update-class-section.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ClassSectionsService {
  constructor(
    @InjectModel(ClassSection.name)
    private readonly classSectionModel: Model<ClassSectionDocument>,
  ) {}

  async findAll(query: PaginationQueryDto & { courseId?: string; teacherId?: string; semester?: string }) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', courseId, teacherId, semester } = query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { className: { $regex: search, $options: 'i' } },
        { classCode: { $regex: search, $options: 'i' } },
      ];
    }
    if (courseId) filter.courseId = courseId;
    if (teacherId) filter.teacherId = teacherId;
    if (semester) filter.semester = semester;

    const [data, total] = await Promise.all([
      this.classSectionModel
        .find(filter)
        .populate('courseId', 'courseCode courseName')
        .populate('teacherId', 'name email')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.classSectionModel.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<ClassSectionDocument> {
    const section = await this.classSectionModel
      .findById(id)
      .populate('courseId', 'courseCode courseName credits')
      .populate('teacherId', 'name email');
    if (!section) throw new NotFoundException('Class section not found');
    return section;
  }

  async create(dto: CreateClassSectionDto): Promise<ClassSectionDocument> {
    return new this.classSectionModel(dto).save();
  }

  async update(id: string, dto: UpdateClassSectionDto): Promise<ClassSectionDocument> {
    const updated = await this.classSectionModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Class section not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.classSectionModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Class section not found');
  }
}
