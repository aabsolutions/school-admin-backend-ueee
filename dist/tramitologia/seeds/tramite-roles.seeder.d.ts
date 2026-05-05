import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoleConfig } from '../../role-config/schemas/role-config.schema';
export declare class TramiteRolesSeeder implements OnModuleInit {
    private readonly roleModel;
    constructor(roleModel: Model<RoleConfig>);
    onModuleInit(): Promise<void>;
}
