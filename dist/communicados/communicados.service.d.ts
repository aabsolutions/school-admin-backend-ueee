import { Model, Types } from 'mongoose';
import { Communicado, CommunicadoDocument } from './schemas/communicado.schema';
import { ParentDocument } from '../parents/schemas/parent.schema';
import { StudentDocument } from '../students/schemas/student.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateCommunicadoDto } from './dto/create-communicado.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class CommunicadosService {
    private readonly communicadoModel;
    private readonly parentModel;
    private readonly studentModel;
    private readonly userModel;
    private readonly notificationsService;
    constructor(communicadoModel: Model<CommunicadoDocument>, parentModel: Model<ParentDocument>, studentModel: Model<StudentDocument>, userModel: Model<UserDocument>, notificationsService: NotificationsService);
    create(teacherUserId: string, dto: CreateCommunicadoDto): Promise<CommunicadoDocument>;
    findByTeacher(teacherUserId: string, query: PaginationQueryDto): Promise<{
        data: (Communicado & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByParent(parentUserId: string, query: PaginationQueryDto): Promise<{
        data: (Communicado & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string, requestingUserId: string): Promise<CommunicadoDocument>;
    createFromAbsence(studentId: string, date: Date, takenByUserId: string): Promise<void>;
    markReceived(id: string, parentUserId: string): Promise<CommunicadoDocument>;
}
