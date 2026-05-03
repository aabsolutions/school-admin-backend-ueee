"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleConfigService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_config_schema_1 = require("./schemas/role-config.schema");
const SYSTEM_ROLES = [
    {
        name: 'SUPERADMIN',
        displayName: 'Súper Administrador',
        description: 'Acceso completo al sistema. No configurable.',
        isSystem: true,
        priority: 0,
        sidebarPermissions: [],
    },
    {
        name: 'ADMIN',
        displayName: 'Administrador',
        description: 'Administrador del sistema escolar.',
        isSystem: true,
        priority: 1,
        sidebarPermissions: [],
    },
];
let RoleConfigService = class RoleConfigService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async onModuleInit() {
        await this.seedSystemRoles();
    }
    async seedSystemRoles() {
        for (const role of SYSTEM_ROLES) {
            await this.roleModel.updateOne({ name: role.name }, { $setOnInsert: role }, { upsert: true });
        }
    }
    async findAll() {
        return this.roleModel.find().sort({ priority: 1 }).lean().exec();
    }
    async findByName(name) {
        return this.roleModel.findOne({ name: name.toUpperCase() }).exec();
    }
    async findById(id) {
        const role = await this.roleModel.findById(id).exec();
        if (!role)
            throw new common_1.NotFoundException(`Rol con id "${id}" no encontrado`);
        return role;
    }
    async create(dto) {
        const existing = await this.roleModel.findOne({ name: dto.name });
        if (existing)
            throw new common_1.ConflictException(`El rol "${dto.name}" ya existe`);
        const created = new this.roleModel({ ...dto, isSystem: false, priority: dto.priority ?? 10 });
        return created.save();
    }
    async update(id, dto) {
        const role = await this.findById(id);
        if (role.isSystem) {
            const allowed = {};
            if (dto.sidebarPermissions !== undefined)
                allowed.sidebarPermissions = dto.sidebarPermissions;
            if (dto.displayName !== undefined)
                allowed.displayName = dto.displayName;
            if (dto.description !== undefined)
                allowed.description = dto.description;
            return this.roleModel
                .findByIdAndUpdate(id, { $set: allowed }, { new: true })
                .lean()
                .exec();
        }
        if (dto.name && dto.name !== role.name) {
            const exists = await this.roleModel.findOne({ name: dto.name });
            if (exists)
                throw new common_1.ConflictException(`El rol "${dto.name}" ya existe`);
        }
        return this.roleModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true })
            .lean()
            .exec();
    }
    async updatePermissions(id, permissions) {
        const role = await this.findById(id);
        if (role.name === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('SuperAdmin no necesita configuración de permisos');
        }
        return this.roleModel
            .findByIdAndUpdate(id, { $set: { sidebarPermissions: permissions } }, { new: true })
            .lean()
            .exec();
    }
    async remove(id) {
        const role = await this.findById(id);
        if (role.isSystem) {
            throw new common_1.ForbiddenException('Los roles del sistema no pueden eliminarse');
        }
        await this.roleModel.findByIdAndDelete(id);
    }
    async getSidebarPermissions(roleName) {
        const role = await this.findByName(roleName);
        return role?.sidebarPermissions ?? [];
    }
};
exports.RoleConfigService = RoleConfigService;
exports.RoleConfigService = RoleConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_config_schema_1.RoleConfig.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleConfigService);
//# sourceMappingURL=role-config.service.js.map