import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeceRegistroDocument = DeceRegistro & Document;

@Schema({ timestamps: true })
export class DeceRegistro {
  @Prop({ type: Types.ObjectId, ref: 'DeceExpediente', required: true, index: true })
  expedienteId: Types.ObjectId;

  @Prop({
    required: true,
    enum: [
      'Seguimiento individual',
      'Entrevista familiar',
      'Crisis emocional',
      'Derivación externa',
      'Taller grupal',
      'Acompañamiento académico',
      'Otro',
    ],
  })
  tipo: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ type: [String], default: [] })
  evidencias: string[];

  @Prop({ required: true, trim: true })
  creadoPor: string;
}

export const DeceRegistroSchema = SchemaFactory.createForClass(DeceRegistro);
