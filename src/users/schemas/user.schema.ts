import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export enum Role {
  SuperAdmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Teacher = 'TEACHER',
  Student = 'STUDENT',
  Parent = 'PARENT',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ default: 'assets/images/user/user1.jpg' })
  avatar: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ default: true })
  isActive: boolean;

  // Guardamos el HASH del token, nunca el token raw
  @Prop({ select: false })
  resetPasswordToken?: string;

  @Prop({ select: false })
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before save
UserSchema.pre<HydratedDocument<User>>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password as string, 10);
});

// Instance method to validate password
UserSchema.methods.validatePassword = async function (
  plain: string,
): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};
