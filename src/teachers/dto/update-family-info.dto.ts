import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeacherFamilyInfoDto {
  @IsOptional() @IsString()  maritalStatus?: string;
  @IsOptional() @IsString()  spouseName?: string;
  @IsOptional() @IsString()  spouseOccupation?: string;
  @IsOptional() @IsString()  spouseMobile?: string;
  @IsOptional() @IsNumber()  numberOfChildren?: number;
  @IsOptional() @IsString()  childrenAges?: string;
  @IsOptional() @IsString()  housingType?: string;
  @IsOptional() @IsString()  familyNotes?: string;
}
