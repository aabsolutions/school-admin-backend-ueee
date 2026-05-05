import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Plantilla, PlantillaDocument } from '../schemas/plantilla.schema';
import { CreatePlantillaDto } from '../dto/create-plantilla.dto';
import { UpdatePlantillaDto } from '../dto/update-plantilla.dto';
import { VariableParserService } from './variable-parser.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class PlantillasService {
  constructor(
    @InjectModel(Plantilla.name) private readonly plantillaModel: Model<PlantillaDocument>,
    private readonly varParser: VariableParserService,
  ) {}

  async create(dto: CreatePlantillaDto, userId: string): Promise<PlantillaDocument> {
    const parsed = this.varParser.parse(dto.bodyHtml);
    const variables = dto.variables ?? this.varParser.mergeWithExistingConfig(parsed, []);
    return new this.plantillaModel({
      ...dto,
      variables,
      createdBy: new Types.ObjectId(userId),
    }).save();
  }

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const filter: Record<string, unknown> = { isActive: true };
    if (search) filter['$or'] = [
      { nombre: { $regex: search, $options: 'i' } },
      { categoria: { $regex: search, $options: 'i' } },
    ];
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.plantillaModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
      this.plantillaModel.countDocuments(filter),
    ]);
    return { data, total, page, limit };
  }

  async findAvailable(userRole: string): Promise<PlantillaDocument[]> {
    return this.plantillaModel
      .find({ isActive: true, solicitanteRoles: userRole })
      .sort({ nombre: 1 })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<PlantillaDocument> {
    const plantilla = await this.plantillaModel.findById(id).exec();
    if (!plantilla) throw new NotFoundException(`Plantilla ${id} no encontrada`);
    return plantilla;
  }

  async update(id: string, dto: UpdatePlantillaDto): Promise<PlantillaDocument> {
    const existing = await this.findOne(id);
    if (dto.bodyHtml && dto.bodyHtml !== existing.bodyHtml) {
      const parsed = this.varParser.parse(dto.bodyHtml);
      dto.variables = this.varParser.mergeWithExistingConfig(parsed, existing.variables as any);
    }
    const updated = await this.plantillaModel
      .findByIdAndUpdate(id, { ...dto, $inc: { version: 1 } }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Plantilla ${id} no encontrada`);
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    await this.plantillaModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }
}
