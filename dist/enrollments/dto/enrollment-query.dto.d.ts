import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class EnrollmentQueryDto extends PaginationQueryDto {
    studentId?: string;
    cursoLectivoId?: string;
    status?: string;
}
