import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class EnrollmentQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  studentId?: string;

  @IsOptional()
  @IsMongoId()
  cursoLectivoId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
