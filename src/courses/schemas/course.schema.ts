import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true, uppercase: true }) courseCode: string;
  @Prop({ required: true, trim: true }) courseName: string;
  @Prop() description: string;
  @Prop({ type: Types.ObjectId, ref: 'Department', required: true }) departmentId: Types.ObjectId;
  @Prop({ required: true, min: 1, max: 6 }) credits: number;
  @Prop() durationWeeks: number;
  @Prop({ default: false }) isElective: boolean;
  @Prop({ enum: ['active', 'inactive', 'archived'], default: 'active' }) status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
