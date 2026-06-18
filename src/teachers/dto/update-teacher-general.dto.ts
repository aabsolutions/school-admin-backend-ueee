import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

const toUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.toUpperCase() : value;

export class UpdateTeacherGeneralDto {
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsEnum(['Male', 'Female', 'Other']) gender?: string;
  @IsOptional() @IsDateString() birthdate?: string;
  @IsOptional() @IsNumber() @Min(0) peso?: number;
  @IsOptional() @IsNumber() @Min(0) talla?: number;
  @IsOptional() @IsString() bio?: string;
  @Transform(toUpper) @IsOptional() @IsString() emergencyName?: string;
  @IsOptional() @IsString() emergencyMobile?: string;
}
