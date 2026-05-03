import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceAssignmentDocument = AttendanceAssignment & Document;

@Schema({ timestamps: true })
export class AttendanceAssignment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CursoLectivo', required: true })
  cursoLectivoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso', required: true })
  cursoId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const AttendanceAssignmentSchema = SchemaFactory.createForClass(AttendanceAssignment);
AttendanceAssignmentSchema.index({ cursoLectivoId: 1 }, { unique: true });
