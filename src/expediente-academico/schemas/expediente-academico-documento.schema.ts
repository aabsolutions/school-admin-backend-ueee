import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpedienteAcademicoDocumentoDocument = ExpedienteAcademicoDocumento & Document;

@Schema({ timestamps: true })
export class ExpedienteAcademicoDocumento {
  @Prop({ type: Types.ObjectId, ref: 'ExpedienteAcademico', required: true, index: true })
  expedienteId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  seccion: string;

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  url: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop({ required: true, trim: true })
  creadoPor: string;

  @Prop()
  fecha: Date;
}

export const ExpedienteAcademicoDocumentoSchema = SchemaFactory.createForClass(
  ExpedienteAcademicoDocumento,
);
