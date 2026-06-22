import { Transform, Type } from 'class-transformer';
import {
  IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber,
  IsOptional, IsString, ValidateNested, Min,
} from 'class-validator';

// Strings → trim; empty string → undefined so @IsOptional() skips validation
const trim = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') {
    const s = value.trim();
    return s === '' ? undefined : s;
  }
  return value;
};

// Strings → uppercase after trim; empty → undefined
const toUpper = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') {
    const s = value.trim().toUpperCase();
    return s === '' ? undefined : s;
  }
  return value;
};

// Strings → number; empty or NaN → undefined
const toNumber = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  const n = Number(value);
  return isNaN(n) ? undefined : n;
};

// Various date formats → YYYY-MM-DD (ISO 8601)
// Excel with raw:false can produce "6/20/1985", "20/06/1985", "1985-06-20", etc.
const toDateISO = ({ value }: { value: unknown }) => {
  if (!value) return undefined;
  const s = String(value).trim();
  if (!s) return undefined;
  // Already ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  // Try native parse (handles "6/20/1985", "June 20 1985", etc.)
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().substring(0, 10);
  return s; // return as-is, let @IsDateString catch it
};

// "true"/"false"/"si"/"no"/"1"/"0" → boolean
const toBoolean = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value;
  const s = String(value).toLowerCase().trim();
  return s === 'true' || s === 'si' || s === '1' || s === 'yes';
};

export class BulkTeacherItemDto {
  // ─── Datos básicos ────────────────────────────────────────────────
  @Transform(toUpper)  @IsNotEmpty() @IsString() name: string;
  @Transform(trim)     @IsNotEmpty() @IsString() dni: string;
  @Transform(trim)     @IsOptional() @IsString() email?: string;
  @Transform(trim)     @IsOptional() @IsString() mobile?: string;
  @Transform(trim)     @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @Transform(toDateISO)@IsOptional() @IsDateString() birthdate?: string;
  @Transform(trim)     @IsOptional() @IsString() address?: string;
  @Transform(trim)     @IsOptional() @IsString() subjectSpecialization?: string;
  @Transform(toNumber) @IsOptional() @IsNumber() @Min(0) experienceYears?: number;
  @Transform(trim)     @IsOptional() @IsEnum(['CONTRATO', 'NOMBRAMIENTO DEFINITIVO', 'NOMBRAMIENTO PROVISIONAL']) laboralDependency?: string;
  @Transform(trim)     @IsOptional() @IsEnum(['MATUTINA', 'VESPERTINA', 'NOCTURNA']) jornadaLaboral?: string;
  @Transform(trim)     @IsOptional() @IsEmail() correoInstitucional?: string;
  @Transform(trim)     @IsOptional() @IsEnum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) salarialCategory?: string;
  @Transform(toUpper)  @IsOptional() @IsString() emergencyName?: string;
  @Transform(trim)     @IsOptional() @IsString() emergencyMobile?: string;
  @Transform(trim)     @IsOptional() @IsString() bio?: string;
  @Transform(trim)     @IsOptional() @IsEnum(['active', 'inactive', 'on-leave']) status?: string;
  @Transform(toNumber) @IsOptional() @IsNumber() @Min(0) peso?: number;
  @Transform(toNumber) @IsOptional() @IsNumber() @Min(0) talla?: number;

  // ─── Información médica ───────────────────────────────────────────
  @Transform(trim)     @IsOptional() @IsString() bloodType?: string;
  @Transform(toBoolean)@IsOptional() @IsBoolean() hasAllergies?: boolean;
  @Transform(trim)     @IsOptional() @IsString() allergiesDetail?: string;
  @Transform(toBoolean)@IsOptional() @IsBoolean() hasChronicCondition?: boolean;
  @Transform(trim)     @IsOptional() @IsString() chronicConditionDetail?: string;
  @Transform(trim)     @IsOptional() @IsString() currentMedications?: string;
  @Transform(toBoolean)@IsOptional() @IsBoolean() hasDisability?: boolean;
  @Transform(trim)     @IsOptional() @IsString() disabilityDetail?: string;
  @Transform(toBoolean)@IsOptional() @IsBoolean() hasConadis?: boolean;
  @Transform(trim)     @IsOptional() @IsString() conadisNumber?: string;
  @Transform(trim)     @IsOptional() @IsString() healthInsurance?: string;
  @Transform(trim)     @IsOptional() @IsString() policyNumber?: string;

  // ─── Información familiar ─────────────────────────────────────────
  @Transform(trim)     @IsOptional() @IsString() maritalStatus?: string;
  @Transform(trim)     @IsOptional() @IsString() spouseName?: string;
  @Transform(trim)     @IsOptional() @IsString() spouseOccupation?: string;
  @Transform(trim)     @IsOptional() @IsString() spouseMobile?: string;
  @Transform(toNumber) @IsOptional() @IsNumber() @Min(0) numberOfChildren?: number;
  @Transform(trim)     @IsOptional() @IsString() childrenAges?: string;
  @Transform(trim)     @IsOptional() @IsString() housingType?: string;
}

export class BulkCreateTeacherDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkTeacherItemDto)
  records: BulkTeacherItemDto[];
}
