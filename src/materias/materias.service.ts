import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Materia, MateriaDocument } from './schemas/materia.schema';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectModel(Materia.name)
    private readonly materiaModel: Model<MateriaDocument>,
  ) {}

  async findAll(query: PaginationQueryDto & { status?: string }) {
    const { page = 1, limit = 100, search, sortBy = 'nombre', sortOrder = 'asc', status } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { codigo: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      this.materiaModel
        .find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.materiaModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<MateriaDocument> {
    const materia = await this.materiaModel.findById(id);
    if (!materia) throw new NotFoundException('Materia no encontrada');
    return materia;
  }

  async create(dto: CreateMateriaDto): Promise<MateriaDocument> {
    try {
      return await new this.materiaModel(dto).save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe una materia con ese nombre o código');
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateMateriaDto): Promise<MateriaDocument> {
    try {
      const updated = await this.materiaModel.findByIdAndUpdate(id, dto, { new: true });
      if (!updated) throw new NotFoundException('Materia no encontrada');
      return updated;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe una materia con ese nombre o código');
      }
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.materiaModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Materia no encontrada');
  }
}
