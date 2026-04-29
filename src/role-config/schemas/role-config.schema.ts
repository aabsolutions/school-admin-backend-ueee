import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleConfigDocument = RoleConfig & Document;

@Schema({ timestamps: true })
export class RoleConfig {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  name: string; // e.g. 'ADMIN', 'SECRETARIA', 'RECTOR'

  @Prop({ required: true, trim: true })
  displayName: string; // e.g. 'Administrador', 'Secretaria'

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ default: false })
  isSystem: boolean; // SuperAdmin + Admin = true, cannot be deleted

  @Prop({ type: [String], default: [] })
  sidebarPermissions: string[]; // array of route path keys visible for this role

  @Prop({ default: 10 })
  priority: number; // lower = higher in hierarchy (SuperAdmin=0, Admin=1, custom=10+)
}

export const RoleConfigSchema = SchemaFactory.createForClass(RoleConfig);
