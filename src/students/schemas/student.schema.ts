import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  img: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  dni: string;

  @Prop()
  mobile: string;

  @Prop({ enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ enum: ['URBANA', 'RURAL', 'FUERA DEL CANTÓN'] })
  residenceZone: string;

  @Prop()
  birthdate: Date;

  @Prop()
  address: string;

  @Prop()
  parentGuardianName: string;

  @Prop()
  parentGuardianMobile: string;

  @Prop()
  fatherName: string;

  @Prop()
  fatherMobile: string;

  @Prop()
  motherName: string;

  @Prop()
  motherMobile: string;

  @Prop({
    enum: ['active', 'inactive', 'graduated', 'suspended'],
    default: 'active',
  })
  status: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
