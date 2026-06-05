import { IsOptional, IsIn } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class PlantillaQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['solicitud', 'respuesta'])
  tipo?: string;
}
