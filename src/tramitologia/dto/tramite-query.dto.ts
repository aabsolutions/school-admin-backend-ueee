import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TramiteState } from '../schemas/tramite.schema';

export class TramiteQueryDto extends PaginationQueryDto {
  @IsOptional() @IsEnum(TramiteState) state?: TramiteState;
  @IsOptional() @IsString() plantillaId?: string;
  @IsOptional() @IsString() solicitanteUserId?: string;
  @IsOptional() @IsDateString() dateFrom?: string;
  @IsOptional() @IsDateString() dateTo?: string;
  @IsOptional() @IsString() operativoUserId?: string;
}
