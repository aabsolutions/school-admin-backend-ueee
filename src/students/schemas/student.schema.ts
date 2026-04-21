import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

// ─── Subdocumento: Información Médica ──────────────────────────────────────

@Schema({ _id: false })
export class StudentMedicalInfo {
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

  @Prop() doctorName: string;
  @Prop() doctorPhone: string;

  @Prop() healthInsurance: string;
  @Prop() policyNumber: string;

  @Prop() emergencyContactName: string;
  @Prop() emergencyContactPhone: string;
  @Prop() emergencyContactRelation: string;

  @Prop() medicalNotes: string;
}

export const StudentMedicalInfoSchema = SchemaFactory.createForClass(StudentMedicalInfo);

// ─── Subdocumento: Información Familiar ────────────────────────────────────

@Schema({ _id: false })
export class StudentFamilyInfo {
  @Prop({
    enum: [
      'Biparental',
      'Monoparental madre',
      'Monoparental padre',
      'Tutela legal',
      'Otra',
    ],
  })
  familySituation: string;

  @Prop() livesWithWhom: string;

  @Prop() fatherOccupation: string;
  @Prop({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] })
  fatherEducationLevel: string;

  @Prop() motherOccupation: string;
  @Prop({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] })
  motherEducationLevel: string;

  @Prop({ default: 0 }) numberOfSiblings: number;
  @Prop({ default: 1 }) studentBirthOrder: number;

  @Prop({ enum: ['Bajo', 'Medio bajo', 'Medio', 'Medio alto', 'Alto'] })
  socioeconomicLevel: string;

  @Prop({ enum: ['Propia', 'Arrendada', 'Prestada', 'Otra'] })
  housingType: string;

  @Prop() familyNotes: string;
}

export const StudentFamilyInfoSchema = SchemaFactory.createForClass(StudentFamilyInfo);

// ─── Schema principal ───────────────────────────────────────────────────────

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop() img: string;
  @Prop() imgCuerpoEntero: string;
  @Prop({ type: Number }) peso: number;
  @Prop({ type: Number }) talla: number;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  dni: string;

  @Prop() mobile: string;

  @Prop({ enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ enum: ['URBANA', 'RURAL', 'FUERA DEL CANTÓN'] })
  residenceZone: string;

  @Prop() birthdate: Date;
  @Prop() address: string;
  @Prop() parentGuardianName: string;
  @Prop() parentGuardianMobile: string;
  @Prop() fatherName: string;
  @Prop() fatherMobile: string;
  @Prop() motherName: string;
  @Prop() motherMobile: string;

  @Prop({ enum: ['active', 'inactive', 'graduated', 'suspended'], default: 'active' })
  status: string;

  @Prop({ type: StudentMedicalInfoSchema, default: {} })
  medicalInfo: StudentMedicalInfo;

  @Prop({ type: StudentFamilyInfoSchema, default: {} })
  familyInfo: StudentFamilyInfo;

  @Prop({ type: Types.ObjectId, ref: 'Parent', default: null })
  fatherId: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Parent', default: null })
  motherId: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Parent', default: null })
  guardianId: Types.ObjectId | null;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Parent' }], default: [] })
  parentIds: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
StudentSchema.index({ parentIds: 1 });
