import { IsOptional, IsDateString, IsString } from 'class-validator';

export class ReportsQueryDto {
  @IsOptional() @IsDateString() dateFrom?: string;
  @IsOptional() @IsDateString() dateTo?: string;
  @IsOptional() @IsString() categoria?: string;
  @IsOptional() @IsString() operativoUserId?: string;
}
