import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpedienteDocument = Expediente & Document;

@Schema({ timestamps: true })
export class Expediente {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  studentId: Types.ObjectId;

  @Prop({ trim: true })
  notas: string;

  @Prop({ enum: ['abierto', 'cerrado'], default: 'abierto' })
  status: string;
}

export const ExpedienteSchema = SchemaFactory.createForClass(Expediente);
