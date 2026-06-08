import { IsEnum, IsOptional, IsString, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReporteMasivoQueryDto {
  @IsEnum(['absent', 'late', 'excused'])
  status: string;

  @IsOptional() @IsString() dateFrom?: string;
  @IsOptional() @IsString() dateTo?: string;

  @IsOptional() @IsNumber() @Min(1) @Type(() => Number)
  minCount?: number;

  @IsOptional() @IsString() jornada?: string;
}
