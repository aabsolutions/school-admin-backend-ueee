import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentalEstudianteDocument = DocumentalEstudiante & Document;

@Schema({ timestamps: true })
export class DocumentalEstudiante {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  studentId: Types.ObjectId;

  // ─── Boletas/certificados — opcionales ─────────────────────────────────────
  @Prop({ default: false }) boleta2do: boolean;
  @Prop({ default: false }) boleta3ro: boolean;
  @Prop({ default: false }) boleta4to: boolean;

  // ─── Boletas/certificados — obligatorios ───────────────────────────────────
  @Prop({ default: false }) boleta5to: boolean;
  @Prop({ default: false }) boleta6to: boolean;
  @Prop({ default: false }) boleta7mo: boolean;
  @Prop({ default: false }) boleta8vo: boolean;
  @Prop({ default: false }) boleta9no: boolean;
  @Prop({ default: false }) boleta10mo: boolean;
  @Prop({ default: false }) boleta1roBach: boolean;
  @Prop({ default: false }) boleta2doBach: boolean;

  // ─── Documentos de identidad ───────────────────────────────────────────────
  @Prop({ default: false }) copiaCedulaEstudiante: boolean;
  @Prop({ default: false }) copiaCedulaRepresentante: boolean;

  // ─── Solo para 1RO BACH, 2DO BACH, 3RO BACH ───────────────────────────────
  @Prop({ default: false }) certificadoParticipacion: boolean;

  @Prop({ trim: true }) notas: string;
}

export const DocumentalEstudianteSchema = SchemaFactory.createForClass(DocumentalEstudiante);
