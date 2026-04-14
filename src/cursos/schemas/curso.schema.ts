import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CursoDocument = Curso & Document;

@Schema({ timestamps: true })
export class Curso {
  @Prop({ required: true, enum: ['8VO', '9NO', '10MO', '1RO BACH', '2DO BACH', '3RO BACH'] }) nivel: string;
  @Prop({ trim: true }) especialidad: string;
  @Prop({ required: true, trim: true, uppercase: true }) paralelo: string;
  @Prop({ required: true, enum: ['Matutina', 'Vespertina', 'Nocturna'] }) jornada: string;
  @Prop({ required: true, enum: ['EGB Superior', 'Bachillerato General', 'Bachillerato Tecnico'] }) subnivel: string;
  @Prop({ enum: ['active', 'inactive'], default: 'active' }) status: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Materia' }], default: [] }) materias: Types.ObjectId[];
}

export const CursoSchema = SchemaFactory.createForClass(Curso);

// Un curso es único por la combinación de sus cuatro atributos
CursoSchema.index({ nivel: 1, especialidad: 1, paralelo: 1, jornada: 1, subnivel: 1 }, { unique: true });
