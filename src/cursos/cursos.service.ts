import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curso, CursoDocument } from './schemas/curso.schema';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<CursoDocument>,
  ) {}

  async findAll(query: PaginationQueryDto & { jornada?: string; status?: string }) {
    const { page = 1, limit = 10, search, sortBy = 'nivel', sortOrder = 'asc', jornada, status } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { nivel: { $regex: search, $options: 'i' } },
        { especialidad: { $regex: search, $options: 'i' } },
        { paralelo: { $regex: search, $options: 'i' } },
      ];
    }
    if (jornada) filter.jornada = jornada;
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      this.cursoModel
        .find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.cursoModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<CursoDocument> {
    const curso = await this.cursoModel.findById(id);
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  async create(dto: CreateCursoDto): Promise<CursoDocument> {
    try {
      return await new this.cursoModel(dto).save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un curso con ese nivel, especialidad, paralelo y jornada');
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateCursoDto): Promise<CursoDocument> {
    try {
      const updated = await this.cursoModel.findByIdAndUpdate(id, dto, { new: true });
      if (!updated) throw new NotFoundException('Curso no encontrado');
      return updated;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un curso con ese nivel, especialidad, paralelo y jornada');
      }
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.cursoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Curso no encontrado');
  }
}
