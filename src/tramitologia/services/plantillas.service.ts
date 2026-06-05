import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    if (dto.plantillaRespuestaId) await this.validateRespuesta(dto.plantillaRespuestaId);
    const parsed = this.varParser.parse(dto.bodyHtml);
    const variables = dto.variables ?? this.varParser.mergeWithExistingConfig(parsed, []);
    const isRespuesta = dto.tipo === 'respuesta';
    return new this.plantillaModel({
      ...dto,
      tipo: dto.tipo ?? 'solicitud',
      solicitanteRoles: isRespuesta ? [] : (dto.solicitanteRoles ?? ['STUDENT', 'TEACHER', 'PARENT']),
      variables,
      createdBy: new Types.ObjectId(userId),
      ...(dto.plantillaRespuestaId ? { plantillaRespuestaId: new Types.ObjectId(dto.plantillaRespuestaId) } : {}),
    }).save();
  }

  async findAll(query: PaginationQueryDto & { tipo?: string }) {
    const { page = 1, limit = 10, search, tipo } = query;
    const filter: Record<string, unknown> = { isActive: true };
    if (search) filter['$or'] = [
      { nombre: { $regex: search, $options: 'i' } },
      { categoria: { $regex: search, $options: 'i' } },
    ];
    if (tipo) filter['tipo'] = tipo;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.plantillaModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
      this.plantillaModel.countDocuments(filter),
    ]);
    return { data, total, page, limit };
  }

  async findAvailable(userRole: string): Promise<PlantillaDocument[]> {
    return this.plantillaModel
      .find({ isActive: true, tipo: { $ne: 'respuesta' }, solicitanteRoles: userRole })
      .sort({ nombre: 1 })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<PlantillaDocument> {
    const plantilla = await this.plantillaModel
      .findById(id)
      .populate('plantillaRespuestaId', 'nombre _id variables bodyHtml isActive')
      .exec();
    if (!plantilla) throw new NotFoundException(`Plantilla ${id} no encontrada`);
    return plantilla;
  }

  async update(id: string, dto: UpdatePlantillaDto): Promise<PlantillaDocument> {
    if (dto.plantillaRespuestaId) {
      if (dto.plantillaRespuestaId === id) throw new BadRequestException('Una plantilla no puede referenciarse a sí misma como respuesta');
      await this.validateRespuesta(dto.plantillaRespuestaId);
    }
    const existing = await this.plantillaModel.findById(id).exec();
    if (!existing) throw new NotFoundException(`Plantilla ${id} no encontrada`);
    if (dto.bodyHtml && dto.bodyHtml !== existing.bodyHtml) {
      const parsed = this.varParser.parse(dto.bodyHtml);
      dto.variables = this.varParser.mergeWithExistingConfig(parsed, existing.variables as any);
    }
    const resolvedTipo = dto.tipo ?? existing.tipo;
    const updatePayload: any = {
      ...dto,
      $inc: { version: 1 },
      ...(resolvedTipo === 'respuesta' ? { solicitanteRoles: [] } : {}),
    };
    if (dto.plantillaRespuestaId) {
      updatePayload.plantillaRespuestaId = new Types.ObjectId(dto.plantillaRespuestaId);
    } else if ('plantillaRespuestaId' in dto && !dto.plantillaRespuestaId) {
      updatePayload.$unset = { plantillaRespuestaId: '' };
      delete updatePayload.plantillaRespuestaId;
    }
    const updated = await this.plantillaModel
      .findByIdAndUpdate(id, updatePayload, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Plantilla ${id} no encontrada`);
    return updated;
  }

  private async validateRespuesta(plantillaRespuestaId: string): Promise<void> {
    const exists = await this.plantillaModel.findOne({ _id: new Types.ObjectId(plantillaRespuestaId), isActive: true }).lean().exec();
    if (!exists) throw new BadRequestException(`Plantilla de respuesta ${plantillaRespuestaId} no encontrada o inactiva`);
  }

  async softDelete(id: string): Promise<void> {
    await this.plantillaModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }
}
