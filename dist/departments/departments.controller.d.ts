import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Types } from 'mongoose';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    findAll(): Promise<import("./schemas/department.schema").DepartmentDocument[]>;
    findOne(id: Types.ObjectId): Promise<import("./schemas/department.schema").DepartmentDocument>;
    create(dto: CreateDepartmentDto): Promise<import("./schemas/department.schema").DepartmentDocument>;
    update(id: Types.ObjectId, dto: UpdateDepartmentDto): Promise<import("./schemas/department.schema").DepartmentDocument>;
    remove(id: Types.ObjectId): Promise<void>;
}
