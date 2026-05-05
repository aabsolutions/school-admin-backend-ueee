import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TramiteHistoryDocument = TramiteHistory & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class TramiteHistory {
  @Prop({ type: Types.ObjectId, ref: 'Tramite', required: true, index: true })
  tramiteId: Types.ObjectId;

  @Prop({ required: true })
  fromState: string;

  @Prop({ required: true })
  toState: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  actorUserId: Types.ObjectId;

  @Prop({ required: true })
  actorRole: string;

  @Prop({ default: '' })
  observation: string;
}

export const TramiteHistorySchema = SchemaFactory.createForClass(TramiteHistory);

TramiteHistorySchema.index({ tramiteId: 1, createdAt: 1 });
