import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpedienteRegistroDocument = ExpedienteRegistro & Document;

@Schema({ timestamps: true })
export class ExpedienteRegistro {
  @Prop({ type: Types.ObjectId, ref: 'Expediente', required: true, index: true })
  expedienteId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['Reunión', 'Indisciplina', 'Permiso', 'Atraso', 'Acuerdo', 'Llamado de atención', 'Otro'],
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

export const ExpedienteRegistroSchema = SchemaFactory.createForClass(ExpedienteRegistro);
