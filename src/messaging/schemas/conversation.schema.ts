import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ _id: false })
export class ConversationParticipant {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar?: string;
}

export const ConversationParticipantSchema = SchemaFactory.createForClass(ConversationParticipant);

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true, enum: ['direct', 'group'] })
  type: string;

  @Prop({ type: [ConversationParticipantSchema], default: [] })
  participants: ConversationParticipant[];

  @Prop({ trim: true })
  name?: string;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastMessage?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.index({ 'participants.userId': 1 });
