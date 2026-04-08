import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  departmentName: string;

  @IsOptional()
  @IsString()
  hodName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  studentCapacity?: number;

  @IsOptional()
  @IsNumber()
  establishedYear?: number;

  @IsOptional()
  @IsNumber()
  totalFaculty?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
