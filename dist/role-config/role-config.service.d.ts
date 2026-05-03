import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoleConfig, RoleConfigDocument } from './schemas/role-config.schema';
import { CreateRoleConfigDto } from './dto/create-role-config.dto';
import { UpdateRoleConfigDto } from './dto/update-role-config.dto';
export declare class RoleConfigService implements OnModuleInit {
    private readonly roleModel;
    constructor(roleModel: Model<RoleConfigDocument>);
    onModuleInit(): Promise<void>;
    private seedSystemRoles;
    findAll(): Promise<RoleConfig[]>;
    findByName(name: string): Promise<RoleConfigDocument | null>;
    findById(id: string): Promise<RoleConfigDocument>;
    create(dto: CreateRoleConfigDto): Promise<RoleConfig>;
    update(id: string, dto: UpdateRoleConfigDto): Promise<RoleConfig>;
    updatePermissions(id: string, permissions: string[]): Promise<RoleConfig>;
    remove(id: string): Promise<void>;
    getSidebarPermissions(roleName: string): Promise<string[]>;
}
