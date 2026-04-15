import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InstitucionDocument = Institucion & Document;

@Schema({ timestamps: true })
export class Institucion {
  @Prop({ trim: true }) nombre: string;
  @Prop({ trim: true }) codigoAMIE: string;
  @Prop({ trim: true }) distrito: string;
  @Prop({ trim: true }) provincia: string;
  @Prop({ trim: true }) canton: string;
  @Prop({ trim: true }) contacto: string;
  @Prop({ trim: true, lowercase: true }) email: string;
  @Prop({ trim: true }) direccion: string;
  @Prop({ type: Types.ObjectId, ref: 'Teacher' }) autoridad: Types.ObjectId;
  @Prop() logotipo: string;
  @Prop({ trim: true }) periodoLectivoFuncional: string;
}

export const InstitucionSchema = SchemaFactory.createForClass(Institucion);
