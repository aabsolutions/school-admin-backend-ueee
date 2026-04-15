import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institucion, InstitucionDocument } from './schemas/institucion.schema';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class InstitucionService {
  constructor(
    @InjectModel(Institucion.name)
    private readonly model: Model<InstitucionDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getInstitucion(): Promise<InstitucionDocument> {
    let doc = await this.model
      .findOne()
      .populate('autoridad', 'name email')
      .exec();
    if (!doc) {
      doc = await new this.model({}).save();
    }
    return doc;
  }

  async updateInstitucion(dto: UpdateInstitucionDto): Promise<InstitucionDocument> {
    return this.model
      .findOneAndUpdate({}, { $set: dto }, { upsert: true, new: true })
      .populate('autoridad', 'name email')
      .exec();
  }

  async uploadLogo(file: Express.Multer.File): Promise<InstitucionDocument> {
    const url = await this.cloudinaryService.uploadBuffer(file.buffer, 'institucion/logo');
    return this.model
      .findOneAndUpdate({}, { $set: { logotipo: url } }, { upsert: true, new: true })
      .populate('autoridad', 'name email')
      .exec();
  }
}
