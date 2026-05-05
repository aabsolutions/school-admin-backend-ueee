import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlantillaDocument = Plantilla & Document;

export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email';

@Schema({ _id: false })
export class VariableConfig {
  @Prop({ required: true, uppercase: true })
  key: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: ['text', 'textarea', 'select', 'date', 'number', 'email'], default: 'text' })
  fieldType: FieldType;

  @Prop({ default: true })
  required: boolean;

  @Prop({ type: [String], default: [] })
  options: string[];

  @Prop()
  defaultValue?: string;

  @Prop()
  placeholder?: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ _id: false })
export class RequiredAttachment {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: true })
  required: boolean;

  @Prop({ type: [String], default: [] })
  allowedMimes: string[];

  @Prop({ default: 10 * 1024 * 1024 })
  maxSizeBytes: number;
}

@Schema({ timestamps: true })
export class Plantilla {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ default: '' })
  descripcion: string;

  @Prop({ required: true, trim: true })
  categoria: string;

  @Prop({ type: [String], enum: ['STUDENT', 'TEACHER', 'PARENT'], default: ['STUDENT', 'TEACHER', 'PARENT'] })
  solicitanteRoles: string[];

  @Prop({ required: true })
  bodyHtml: string;

  @Prop({ type: [VariableConfig], default: [] })
  variables: VariableConfig[];

  @Prop({ type: [RequiredAttachment], default: [] })
  requiredAttachments: RequiredAttachment[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 1 })
  version: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const VariableConfigSchema = SchemaFactory.createForClass(VariableConfig);
export const RequiredAttachmentSchema = SchemaFactory.createForClass(RequiredAttachment);
export const PlantillaSchema = SchemaFactory.createForClass(Plantilla);

PlantillaSchema.index({ isActive: 1, categoria: 1 });
PlantillaSchema.index({ solicitanteRoles: 1, isActive: 1 });
