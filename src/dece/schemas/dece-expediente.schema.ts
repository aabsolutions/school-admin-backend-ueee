import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeceExpedienteDocument = DeceExpediente & Document;

@Schema({ timestamps: true })
export class DeceExpediente {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  studentId: Types.ObjectId;

  @Prop({ trim: true })
  notas: string;

  @Prop({ enum: ['abierto', 'cerrado'], default: 'abierto' })
  status: string;
}

export const DeceExpedienteSchema = SchemaFactory.createForClass(DeceExpediente);
