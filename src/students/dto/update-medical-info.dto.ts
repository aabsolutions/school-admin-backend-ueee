import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

export class UpdateStudentMedicalInfoDto {
  @IsOptional() @IsString()  bloodType?: string;
  @IsOptional() @IsBoolean() hasAllergies?: boolean;
  @IsOptional() @IsString()  allergiesDetail?: string;
  @IsOptional() @IsBoolean() hasChronicCondition?: boolean;
  @IsOptional() @IsString()  chronicConditionDetail?: string;
  @IsOptional() @IsString()  currentMedications?: string;
  @IsOptional() @IsBoolean() hasDisability?: boolean;
  @IsOptional() @IsString()  disabilityDetail?: string;
  @IsOptional() @IsBoolean() hasConadis?: boolean;
  @IsOptional() @IsString()  conadisNumber?: string;
  @IsOptional() @IsString()  doctorName?: string;
  @IsOptional() @IsString()  doctorPhone?: string;
  @IsOptional() @IsString()  healthInsurance?: string;
  @IsOptional() @IsString()  policyNumber?: string;
  @Transform(toUpper) @IsOptional() @IsString()  emergencyContactName?: string;
  @IsOptional() @IsString()  emergencyContactPhone?: string;
  @IsOptional() @IsString()  emergencyContactRelation?: string;
  @IsOptional() @IsString()  medicalNotes?: string;
}
