import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AreaEstudioDocument = AreaEstudio & Document;

@Schema({ timestamps: true })
export class AreaEstudio {
  @Prop({ required: true, unique: true, trim: true }) nombre: string;
  @Prop({ trim: true }) descripcion: string;
  @Prop({ default: true }) isActive: boolean;
}

export const AreaEstudioSchema = SchemaFactory.createForClass(AreaEstudio);
