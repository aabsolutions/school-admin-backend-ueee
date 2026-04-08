import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CursoLectivoDocument = CursoLectivo & Document;

@Schema({ timestamps: true })
export class CursoLectivo {
  @Prop({ type: Types.ObjectId, ref: 'Curso', required: true }) cursoId: Types.ObjectId;
  @Prop({ required: true }) academicYear: string;
  @Prop({ type: Types.ObjectId, ref: 'Teacher' }) tutorId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Teacher' }) inspectorId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Teacher' }) psicologoId: Types.ObjectId;
  @Prop({ enum: ['active', 'inactive', 'closed'], default: 'active' }) status: string;
}

export const CursoLectivoSchema = SchemaFactory.createForClass(CursoLectivo);

// Un curso no puede abrirse dos veces en el mismo año lectivo
CursoLectivoSchema.index({ cursoId: 1, academicYear: 1 }, { unique: true });
