import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true, unique: true, trim: true })
  departmentName: string;

  @Prop({ trim: true })
  hodName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ default: 0 })
  studentCapacity: number;

  @Prop()
  establishedYear: number;

  @Prop({ default: 0 })
  totalFaculty: number;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
