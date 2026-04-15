import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaEstudio, AreaEstudioDocument } from './schemas/area-estudio.schema';
import { CreateAreaEstudioDto } from './dto/create-area-estudio.dto';
import { UpdateAreaEstudioDto } from './dto/update-area-estudio.dto';

@Injectable()
export class AreaEstudioService {
  constructor(
    @InjectModel(AreaEstudio.name)
    private readonly model: Model<AreaEstudioDocument>,
  ) {}

  async findAll(): Promise<AreaEstudioDocument[]> {
    return this.model.find().sort({ nombre: 1 }).exec();
  }

  async findOne(id: string): Promise<AreaEstudioDocument> {
    const area = await this.model.findById(id);
    if (!area) throw new NotFoundException('Área de estudio no encontrada');
    return area;
  }

  async create(dto: CreateAreaEstudioDto): Promise<AreaEstudioDocument> {
    return new this.model(dto).save();
  }

  async update(id: string, dto: UpdateAreaEstudioDto): Promise<AreaEstudioDocument> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Área de estudio no encontrada');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Área de estudio no encontrada');
  }
}
