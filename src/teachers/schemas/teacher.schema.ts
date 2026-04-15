import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeacherDocument = Teacher & Document;

// ─── Subdocumento: Información Médica ──────────────────────────────────────

@Schema({ _id: false })
export class TeacherMedicalInfo {
  @Prop({ enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] })
  bloodType: string;

  @Prop({ default: false }) hasAllergies: boolean;
  @Prop() allergiesDetail: string;

  @Prop({ default: false }) hasChronicCondition: boolean;
  @Prop() chronicConditionDetail: string;

  @Prop() currentMedications: string;

  @Prop({ default: false }) hasDisability: boolean;
  @Prop() disabilityDetail: string;
  @Prop({ default: false }) hasConadis: boolean;
  @Prop() conadisNumber: string;

  @Prop() healthInsurance: string;
  @Prop() policyNumber: string;

  @Prop() emergencyContactName: string;
  @Prop() emergencyContactPhone: string;
  @Prop() emergencyContactRelation: string;

  @Prop() medicalNotes: string;
}

export const TeacherMedicalInfoSchema = SchemaFactory.createForClass(TeacherMedicalInfo);

// ─── Subdocumento: Información Familiar ────────────────────────────────────

@Schema({ _id: false })
export class TeacherFamilyInfo {
  @Prop({
    enum: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre'],
  })
  maritalStatus: string;

  @Prop() spouseName: string;
  @Prop() spouseOccupation: string;
  @Prop() spouseMobile: string;

  @Prop({ default: 0 }) numberOfChildren: number;
  @Prop() childrenAges: string;

  @Prop() housingType: string;
  @Prop() familyNotes: string;
}

export const TeacherFamilyInfoSchema = SchemaFactory.createForClass(TeacherFamilyInfo);

// ─── Schema principal ───────────────────────────────────────────────────────

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop() img: string;
  @Prop() imgCuerpoEntero: string;
  @Prop({ type: Number }) peso: number;
  @Prop({ type: Number }) talla: number;
  @Prop({ required: true, trim: true }) name: string;
  @Prop({ required: true, unique: true, lowercase: true }) email: string;
  @Prop({ unique: true, sparse: true }) dni: string;
  @Prop({ enum: ['Male', 'Female', 'Other'] }) gender: string;
  @Prop() mobile: string;
  @Prop({ enum: ['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional'] }) laboralDependency: string;
  @Prop({ enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] }) salarialCategory: string;
  @Prop() emergencyName: string;
  @Prop() emergencyMobile: string;
  /** @deprecated Usar areaEstudioId — se mantiene por compatibilidad con datos históricos */
  @Prop({ type: Types.ObjectId, ref: 'Department' }) departmentId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'AreaEstudio' }) areaEstudioId: Types.ObjectId;
  @Prop() address: string;
  @Prop() subjectSpecialization: string;
  @Prop({ default: 0 }) experienceYears: number;
  @Prop({ enum: ['active', 'inactive', 'on-leave'], default: 'active' }) status: string;
  @Prop() birthdate: Date;
  @Prop() bio: string;

  @Prop({ type: TeacherMedicalInfoSchema, default: {} })
  medicalInfo: TeacherMedicalInfo;

  @Prop({ type: TeacherFamilyInfoSchema, default: {} })
  familyInfo: TeacherFamilyInfo;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
