import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CargaHorariaDocument = CargaHoraria & Document;

@Schema({ timestamps: true })
export class CargaHoraria {
  @Prop({ type: Types.ObjectId, ref: 'CursoLectivo', required: true }) cursoLectivoId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Materia',      required: true }) materiaId:      Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Teacher',      required: true }) docenteId:      Types.ObjectId;
}

export const CargaHorariaSchema = SchemaFactory.createForClass(CargaHoraria);

// Una materia solo puede tener un docente por curso lectivo
CargaHorariaSchema.index({ cursoLectivoId: 1, materiaId: 1 }, { unique: true });
// Índice para consultas por docente
CargaHorariaSchema.index({ docenteId: 1, cursoLectivoId: 1 });
