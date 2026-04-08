import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true }) studentId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'CursoLectivo', required: true }) cursoLectivoId: Types.ObjectId;
  @Prop({ default: Date.now }) enrolledAt: Date;
  @Prop({
    enum: ['enrolled', 'withdrawn', 'transferred'],
    default: 'enrolled',
  })
  status: string;
  @Prop() notes: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

// Un estudiante no puede estar matriculado dos veces en el mismo año lectivo del mismo curso
EnrollmentSchema.index({ studentId: 1, cursoLectivoId: 1 }, { unique: true });
