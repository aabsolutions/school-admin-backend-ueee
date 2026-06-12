import { IsEnum, IsOptional, IsString, Min, IsNumber, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class ReporteMasivoQueryDto {
  /** Legacy single-status field — kept for backward compat with web frontend */
  @IsOptional()
  @IsEnum(['absent', 'late', 'excused'])
  status?: string;

  /** New multi-status field — used by mobile app */
  @IsOptional()
  @IsArray()
  @IsEnum(['absent', 'late', 'excused'], { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value) && value.length > 0) return value;
    if (typeof value === 'string' && value.length > 0)
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    return undefined;
  })
  statuses?: string[];

  @IsOptional() @IsString() dateFrom?: string;
  @IsOptional() @IsString() dateTo?: string;

  @IsOptional() @IsNumber() @Min(1) @Type(() => Number)
  minCount?: number;

  @IsOptional() @IsString() jornada?: string;
}
