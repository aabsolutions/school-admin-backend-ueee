import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpedienteAcademicoDocument = ExpedienteAcademico & Document;

@Schema({ timestamps: true })
export class ExpedienteAcademico {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  studentId: Types.ObjectId;
}

export const ExpedienteAcademicoSchema = SchemaFactory.createForClass(ExpedienteAcademico);
