import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentFamilyInfoDto {
  @IsOptional() @IsString()  familySituation?: string;
  @IsOptional() @IsString()  livesWithWhom?: string;
  @IsOptional() @IsString()  fatherOccupation?: string;
  @IsOptional() @IsString()  fatherEducationLevel?: string;
  @IsOptional() @IsString()  motherOccupation?: string;
  @IsOptional() @IsString()  motherEducationLevel?: string;
  @IsOptional() @IsNumber()  numberOfSiblings?: number;
  @IsOptional() @IsNumber()  studentBirthOrder?: number;
  @IsOptional() @IsString()  socioeconomicLevel?: string;
  @IsOptional() @IsString()  housingType?: string;
  @IsOptional() @IsString()  familyNotes?: string;
}
