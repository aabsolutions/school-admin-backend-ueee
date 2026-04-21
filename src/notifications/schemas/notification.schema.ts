import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

export type NotificationType = 'message' | 'system' | 'enrollment' | 'expediente' | 'dece' | 'communicado';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  recipient: Types.ObjectId;

  @Prop({ type: String, required: true, enum: ['message', 'system', 'enrollment', 'expediente', 'dece', 'communicado'] })
  type: NotificationType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  link?: string;

  @Prop({ default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
