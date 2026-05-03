import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceRecordDocument = AttendanceRecord & Document;
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

@Schema({ _id: false })
export class AttendanceEntry {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: String, enum: ['present', 'absent', 'late', 'excused'], default: 'present' })
  status: AttendanceStatus;

  @Prop({ default: '' })
  note: string;
}

export const AttendanceEntrySchema = SchemaFactory.createForClass(AttendanceEntry);

@Schema({ timestamps: true })
export class AttendanceRecord {
  @Prop({ type: Types.ObjectId, ref: 'CursoLectivo', required: true })
  cursoLectivoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso', required: true })
  cursoId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  takenByUserId: Types.ObjectId;

  @Prop({ type: [AttendanceEntrySchema], default: [] })
  records: AttendanceEntry[];
}

export const AttendanceRecordSchema = SchemaFactory.createForClass(AttendanceRecord);
AttendanceRecordSchema.index({ cursoLectivoId: 1, date: 1 }, { unique: true });
AttendanceRecordSchema.index({ cursoLectivoId: 1, date: -1 });
AttendanceRecordSchema.index({ 'records.studentId': 1, date: -1 });
