import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommunicadoDocument = Communicado & Document;

export type CommunicadoStatus = 'sent' | 'received';

@Schema({ timestamps: true })
export class Communicado {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  teacherUserId: Types.ObjectId;

  @Prop({ required: true })
  teacherName: string;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ required: true })
  studentName: string;

  @Prop({ type: Types.ObjectId, ref: 'Parent', required: true, index: true })
  parentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  parentUserId: Types.ObjectId;

  @Prop({ required: true, maxlength: 200 })
  subject: string;

  @Prop({ required: true, maxlength: 2000 })
  body: string;

  @Prop({ type: String, enum: ['sent', 'received'], default: 'sent' })
  status: CommunicadoStatus;

  @Prop()
  receivedAt?: Date;
}

export const CommunicadoSchema = SchemaFactory.createForClass(Communicado);

CommunicadoSchema.index({ parentId: 1, createdAt: -1 });
CommunicadoSchema.index({ teacherUserId: 1, studentId: 1, createdAt: -1 });
