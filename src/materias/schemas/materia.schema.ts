import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MateriaDocument = Materia & Document;

@Schema({ timestamps: true })
export class Materia {
  @Prop({ required: true, trim: true }) nombre: string;
  @Prop({ trim: true, uppercase: true }) codigo: string;
  @Prop({ trim: true }) descripcion: string;
  @Prop({ type: Number, default: 0, min: 0 }) horas: number;
  @Prop({ enum: ['active', 'inactive'], default: 'active' }) status: string;
}

export const MateriaSchema = SchemaFactory.createForClass(Materia);

MateriaSchema.index({ nombre: 1 }, { unique: true });
MateriaSchema.index({ codigo: 1 }, { unique: true, sparse: true });
