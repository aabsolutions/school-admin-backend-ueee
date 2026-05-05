import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TramiteState } from '../schemas/tramite.schema';
export declare class TramiteQueryDto extends PaginationQueryDto {
    state?: TramiteState;
    plantillaId?: string;
    solicitanteUserId?: string;
    dateFrom?: string;
    dateTo?: string;
    operativoUserId?: string;
}
