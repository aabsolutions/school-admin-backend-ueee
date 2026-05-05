import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RequiredAttachment, VariableConfig } from './plantilla.schema';

export type TramiteDocument = Tramite & Document;

export enum TramiteState {
  Pendiente = 'pendiente',
  EnProceso = 'en_proceso',
  Aprobado = 'aprobado',
  Rechazado = 'rechazado',
  Finalizado = 'finalizado',
}

@Schema({ _id: false })
export class PlantillaSnapshot {
  @Prop({ type: Types.ObjectId, required: true })
  plantillaId: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  version: number;

  @Prop({ required: true })
  bodyHtml: string;

  @Prop({ type: [VariableConfig], default: [] })
  variables: VariableConfig[];

  @Prop({ type: [RequiredAttachment], default: [] })
  requiredAttachments: RequiredAttachment[];
}

@Schema({ _id: false })
export class FilledValue {
  @Prop({ required: true })
  key: string;

  @Prop({ type: Object })
  value: unknown;
}

@Schema({ _id: false })
export class TramiteAttachment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  mime: string;

  @Prop({ required: true })
  sizeBytes: number;

  @Prop({ type: Date, default: () => new Date() })
  uploadedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;
}

@Schema({ timestamps: true })
export class Tramite {
  @Prop({ required: true, unique: true })
  codigo: string;

  @Prop({ type: PlantillaSnapshot, required: true })
  plantilla: PlantillaSnapshot;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  solicitanteUserId: Types.ObjectId;

  @Prop({ required: true })
  solicitanteRole: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  operativoUserId?: Types.ObjectId;

  @Prop({ type: [FilledValue], default: [] })
  values: FilledValue[];

  @Prop({ type: [TramiteAttachment], default: [] })
  attachments: TramiteAttachment[];

  @Prop({ default: '' })
  renderedHtml: string;

  @Prop({
    type: String,
    enum: Object.values(TramiteState),
    default: TramiteState.Pendiente,
  })
  state: TramiteState;

  @Prop()
  lastObservation?: string;

  @Prop({ type: Date })
  closedAt?: Date;
}

export const TramiteSchema = SchemaFactory.createForClass(Tramite);

TramiteSchema.index({ state: 1, createdAt: -1 });
TramiteSchema.index({ operativoUserId: 1, state: 1 });
TramiteSchema.index({ solicitanteUserId: 1, createdAt: -1 });
TramiteSchema.index({ 'plantilla.plantillaId': 1, state: 1 });
