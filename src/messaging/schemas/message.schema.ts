import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ _id: false })
export class ReadReceipt {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ default: Date.now })
  readAt: Date;
}

export const ReadReceiptSchema = SchemaFactory.createForClass(ReadReceipt);

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true, index: true })
  conversationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ default: 'text', enum: ['text'] })
  type: string;

  @Prop({ type: [ReadReceiptSchema], default: [] })
  readBy: ReadReceipt[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
