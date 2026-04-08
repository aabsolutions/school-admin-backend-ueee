import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassSectionDocument = ClassSection & Document;

@Schema({ timestamps: true })
export class ClassSection {
  @Prop({ required: true, trim: true }) className: string;
  @Prop({ required: true, unique: true, uppercase: true }) classCode: string;
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) courseId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true }) teacherId: Types.ObjectId;
  @Prop() startDate: Date;
  @Prop() endDate: Date;
  @Prop() roomNumber: string;
  @Prop() schedule: string;
  @Prop({ required: true }) semester: string;
  @Prop({ required: true }) academicYear: string;
  @Prop({ default: 30, min: 1 }) classCapacity: number;
  @Prop({ enum: ['active', 'inactive', 'completed'], default: 'active' }) status: string;
  @Prop({ enum: ['lecture', 'lab', 'seminar', 'online'], default: 'lecture' }) classType: string;
}

export const ClassSectionSchema = SchemaFactory.createForClass(ClassSection);
