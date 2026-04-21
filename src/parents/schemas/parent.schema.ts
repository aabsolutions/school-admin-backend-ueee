import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ParentDocument = Parent & Document;

@Schema({ timestamps: true })
export class Parent {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  dni: string;

  @Prop()
  mobile: string;

  @Prop({ enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop()
  address: string;

  @Prop()
  occupation: string;

  @Prop({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] })
  educationLevel: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }], default: [] })
  studentIds: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
ParentSchema.index({ studentIds: 1 });
