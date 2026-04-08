import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CursoLectivo, CursoLectivoDocument } from './schemas/curso-lectivo.schema';
import { CreateCursoLectivoDto } from './dto/create-curso-lectivo.dto';
import { UpdateCursoLectivoDto } from './dto/update-curso-lectivo.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CursoLectivoService {
  constructor(
    @InjectModel(CursoLectivo.name)
    private readonly cursoLectivoModel: Model<CursoLectivoDocument>,
  ) {}

  async findAll(query: PaginationQueryDto & { academicYear?: string; status?: string; cursoId?: string }) {
    const { page = 1, limit = 10, sortBy = 'academicYear', sortOrder = 'desc', academicYear, status, cursoId } = query;

    const filter: any = {};
    if (academicYear) filter.academicYear = academicYear;
    if (status) filter.status = status;
    if (cursoId) filter.cursoId = cursoId;

    const [data, total] = await Promise.all([
      this.cursoLectivoModel
        .find(filter)
        .populate('cursoId', 'nivel especialidad paralelo jornada')
        .populate('tutorId', 'name email')
        .populate('inspectorId', 'name email')
        .populate('psicologoId', 'name email')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.cursoLectivoModel.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<CursoLectivoDocument> {
    const cl = await this.cursoLectivoModel
      .findById(id)
      .populate('cursoId', 'nivel especialidad paralelo jornada status')
      .populate('tutorId', 'name email mobile')
      .populate('inspectorId', 'name email mobile')
      .populate('psicologoId', 'name email mobile');
    if (!cl) throw new NotFoundException('Curso lectivo no encontrado');
    return cl;
  }

  async create(dto: CreateCursoLectivoDto): Promise<CursoLectivoDocument> {
    try {
      const saved = await new this.cursoLectivoModel(dto).save();
      return this.findOne(saved._id.toString());
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un año lectivo para ese curso');
      }
      throw err;
    }
  }

  async update(id: string, dto: UpdateCursoLectivoDto): Promise<CursoLectivoDocument> {
    try {
      const updated = await this.cursoLectivoModel.findByIdAndUpdate(id, dto, { new: true });
      if (!updated) throw new NotFoundException('Curso lectivo no encontrado');
      return this.findOne(id);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Ya existe un año lectivo para ese curso');
      }
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.cursoLectivoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Curso lectivo no encontrado');
  }
}
