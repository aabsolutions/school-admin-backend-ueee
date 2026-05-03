import { CommunicadosService } from './communicados.service';
import { CreateCommunicadoDto } from './dto/create-communicado.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
export declare class CommunicadosController {
    private readonly svc;
    constructor(svc: CommunicadosService);
    create(user: any, dto: CreateCommunicadoDto): Promise<import("./schemas/communicado.schema").CommunicadoDocument>;
    findByTeacher(user: any, query: PaginationQueryDto): Promise<{
        data: (import("./schemas/communicado.schema").Communicado & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByParent(user: any, query: PaginationQueryDto): Promise<{
        data: (import("./schemas/communicado.schema").Communicado & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: Types.ObjectId, user: any): Promise<import("./schemas/communicado.schema").CommunicadoDocument>;
    markReceived(id: Types.ObjectId, user: any): Promise<import("./schemas/communicado.schema").CommunicadoDocument>;
}
