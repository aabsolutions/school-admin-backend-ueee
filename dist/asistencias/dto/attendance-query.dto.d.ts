import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class AttendanceQueryDto extends PaginationQueryDto {
    cursoLectivoId?: string;
    dateFrom?: string;
    dateTo?: string;
    studentId?: string;
}
