import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleConfig, RoleConfigDocument } from './schemas/role-config.schema';
import { CreateRoleConfigDto } from './dto/create-role-config.dto';
import { UpdateRoleConfigDto } from './dto/update-role-config.dto';

const SYSTEM_ROLES = [
  {
    name: 'SUPERADMIN',
    displayName: 'Súper Administrador',
    description: 'Acceso completo al sistema. No configurable.',
    isSystem: true,
    priority: 0,
    sidebarPermissions: [], // SuperAdmin bypasses permission check — empty = unrestricted
  },
  {
    name: 'ADMIN',
    displayName: 'Administrador',
    description: 'Administrador del sistema escolar.',
    isSystem: true,
    priority: 1,
    sidebarPermissions: [], // will be populated at seed time with all admin paths
  },
];

@Injectable()
export class RoleConfigService implements OnModuleInit {
  constructor(
    @InjectModel(RoleConfig.name)
    private readonly roleModel: Model<RoleConfigDocument>,
  ) {}

  async onModuleInit() {
    await this.seedSystemRoles();
  }

  private async seedSystemRoles() {
    for (const role of SYSTEM_ROLES) {
      await this.roleModel.updateOne(
        { name: role.name },
        { $setOnInsert: role },
        { upsert: true },
      );
    }
  }

  async findAll(): Promise<RoleConfig[]> {
    return this.roleModel.find().sort({ priority: 1 }).lean().exec();
  }

  async findByName(name: string): Promise<RoleConfigDocument | null> {
    return this.roleModel.findOne({ name: name.toUpperCase() }).exec();
  }

  async findById(id: string): Promise<RoleConfigDocument> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException(`Rol con id "${id}" no encontrado`);
    return role;
  }

  async create(dto: CreateRoleConfigDto): Promise<RoleConfig> {
    const existing = await this.roleModel.findOne({ name: dto.name });
    if (existing) throw new ConflictException(`El rol "${dto.name}" ya existe`);

    const created = new this.roleModel({ ...dto, isSystem: false, priority: dto.priority ?? 10 });
    return created.save();
  }

  async update(id: string, dto: UpdateRoleConfigDto): Promise<RoleConfig> {
    const role = await this.findById(id);

    // System roles: only sidebarPermissions, displayName and description can change
    if (role.isSystem) {
      const allowed: Partial<UpdateRoleConfigDto> = {};
      if (dto.sidebarPermissions !== undefined) allowed.sidebarPermissions = dto.sidebarPermissions;
      if (dto.displayName !== undefined) allowed.displayName = dto.displayName;
      if (dto.description !== undefined) allowed.description = dto.description;
      return this.roleModel
        .findByIdAndUpdate(id, { $set: allowed }, { new: true })
        .lean()
        .exec() as Promise<RoleConfig>;
    }

    if (dto.name && dto.name !== role.name) {
      const exists = await this.roleModel.findOne({ name: dto.name });
      if (exists) throw new ConflictException(`El rol "${dto.name}" ya existe`);
    }

    return this.roleModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .lean()
      .exec() as Promise<RoleConfig>;
  }

  async updatePermissions(id: string, permissions: string[]): Promise<RoleConfig> {
    const role = await this.findById(id);
    if (role.name === 'SUPERADMIN') {
      throw new ForbiddenException('SuperAdmin no necesita configuración de permisos');
    }
    return this.roleModel
      .findByIdAndUpdate(id, { $set: { sidebarPermissions: permissions } }, { new: true })
      .lean()
      .exec() as Promise<RoleConfig>;
  }

  async remove(id: string): Promise<void> {
    const role = await this.findById(id);
    if (role.isSystem) {
      throw new ForbiddenException('Los roles del sistema no pueden eliminarse');
    }
    await this.roleModel.findByIdAndDelete(id);
  }

  async getSidebarPermissions(roleName: string): Promise<string[]> {
    const role = await this.findByName(roleName);
    return role?.sidebarPermissions ?? [];
  }
}
