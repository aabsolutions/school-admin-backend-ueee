import { Model } from 'mongoose';
import { DepartmentDocument } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsService {
    private readonly departmentModel;
    constructor(departmentModel: Model<DepartmentDocument>);
    findAll(): Promise<DepartmentDocument[]>;
    findOne(id: string): Promise<DepartmentDocument>;
    create(dto: CreateDepartmentDto): Promise<DepartmentDocument>;
    update(id: string, dto: UpdateDepartmentDto): Promise<DepartmentDocument>;
    remove(id: string): Promise<void>;
}
