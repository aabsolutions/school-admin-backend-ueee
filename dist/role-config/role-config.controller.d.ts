import { RoleConfigService } from './role-config.service';
import { CreateRoleConfigDto } from './dto/create-role-config.dto';
import { UpdateRoleConfigDto } from './dto/update-role-config.dto';
declare class UpdatePermissionsDto {
    sidebarPermissions: string[];
}
export declare class RoleConfigController {
    private readonly service;
    constructor(service: RoleConfigService);
    findAll(): Promise<import("./schemas/role-config.schema").RoleConfig[]>;
    findOne(id: string): Promise<import("./schemas/role-config.schema").RoleConfigDocument>;
    create(dto: CreateRoleConfigDto): Promise<import("./schemas/role-config.schema").RoleConfig>;
    update(id: string, dto: UpdateRoleConfigDto): Promise<import("./schemas/role-config.schema").RoleConfig>;
    updatePermissions(id: string, dto: UpdatePermissionsDto): Promise<import("./schemas/role-config.schema").RoleConfig>;
    remove(id: string): Promise<void>;
}
export {};
