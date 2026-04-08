import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  async findAll(): Promise<DepartmentDocument[]> {
    return this.departmentModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<DepartmentDocument> {
    const dept = await this.departmentModel.findById(id);
    if (!dept) throw new NotFoundException('Department not found');
    return dept;
  }

  async create(dto: CreateDepartmentDto): Promise<DepartmentDocument> {
    return new this.departmentModel(dto).save();
  }

  async update(id: string, dto: UpdateDepartmentDto): Promise<DepartmentDocument> {
    const updated = await this.departmentModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.departmentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Department not found');
  }
}
