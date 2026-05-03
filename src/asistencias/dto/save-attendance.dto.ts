import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AttendanceEntryDto {
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;

  @IsOptional()
  @IsEnum(['present', 'absent', 'late', 'excused'])
  status?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

export class SaveAttendanceDto {
  @IsNotEmpty()
  @IsMongoId()
  cursoLectivoId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceEntryDto)
  records: AttendanceEntryDto[];
}
