import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentalDocenteDocument = DocumentalDocente & Document;

// ─── Subdocumento: Archivo ─────────────────────────────────────────────────

@Schema({ _id: true, timestamps: false })
export class DocumentoItem {
  @Prop({ required: true, trim: true }) nombre: string;
  @Prop({ required: true }) url: string;
  @Prop({ required: true, enum: ['profesional', 'planificacion'] }) categoria: string;
  @Prop({ trim: true }) descripcion: string;
  @Prop({ default: () => new Date() }) fecha: Date;
}

export const DocumentoItemSchema = SchemaFactory.createForClass(DocumentoItem);

// ─── Schema principal ──────────────────────────────────────────────────────

@Schema({ timestamps: true })
export class DocumentalDocente {
  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true, unique: true })
  teacherId: Types.ObjectId;

  @Prop({ type: [DocumentoItemSchema], default: [] })
  documentos: DocumentoItem[];
}

export const DocumentalDocenteSchema = SchemaFactory.createForClass(DocumentalDocente);
