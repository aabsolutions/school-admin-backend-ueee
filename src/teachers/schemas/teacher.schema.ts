import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop() img: string;
  @Prop({ required: true, trim: true }) name: string;
  @Prop({ required: true, unique: true, lowercase: true }) email: string;
  @Prop({ unique: true, sparse: true }) dni: string;
  @Prop({ enum: ['Male', 'Female', 'Other'] }) gender: string;
  @Prop() mobile: string;
  @Prop({ enum: ['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional'] }) laboralDependency: string;
  @Prop({ enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] }) salarialCategory: string;
  @Prop() emergencyName: string;
  @Prop() emergencyMobile: string;
  @Prop({ type: Types.ObjectId, ref: 'Department' }) departmentId: Types.ObjectId;
  @Prop() address: string;
  @Prop() subjectSpecialization: string;
  @Prop({ default: 0 }) experienceYears: number;
  @Prop({ enum: ['active', 'inactive', 'on-leave'], default: 'active' }) status: string;
  @Prop() birthdate: Date;
  @Prop() bio: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
