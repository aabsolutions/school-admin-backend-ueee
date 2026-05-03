import { IsDateString, IsMongoId, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class AttendanceQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  cursoLectivoId?: string;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @IsMongoId()
  studentId?: string;
}
