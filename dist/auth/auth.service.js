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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const user_schema_1 = require("../users/schemas/user.schema");
const role_config_service_1 = require("../role-config/role-config.service");
const ROLE_PRIORITY = {
    [user_schema_1.Role.SuperAdmin]: 0,
    [user_schema_1.Role.Admin]: 1,
    [user_schema_1.Role.Teacher]: 2,
    [user_schema_1.Role.Student]: 3,
    [user_schema_1.Role.Parent]: 4,
};
let AuthService = class AuthService {
    constructor(usersService, jwtService, config, mailService, roleConfigService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
        this.mailService = mailService;
        this.roleConfigService = roleConfigService;
    }
    async login(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const valid = await user.validatePassword(password);
        if (!valid)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const payload = {
            sub: user._id.toString(),
            username: user.username,
            role: user.role,
            name: user.name,
        };
        const accessToken = this.jwtService.sign(payload);
        const sidebarPermissions = await this.roleConfigService.getSidebarPermissions(user.role);
        return {
            user: {
                id: user._id.toString(),
                username: user.username,
                firstName: user.name.split(' ')[0] ?? user.name,
                lastName: user.name.split(' ').slice(1).join(' ') ?? '',
                img: user.avatar,
                roles: [{ name: user.role, priority: ROLE_PRIORITY[user.role] ?? 10 }],
                permissions: user.permissions,
                sidebarPermissions,
                token: accessToken,
            },
            token: accessToken,
        };
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.isActive)
            return;
        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await this.usersService.setResetToken(user._id, tokenHash, expires);
        const frontendUrl = this.config.get('FRONTEND_URL', 'https://aabsolutions.github.io/school-admin-frontend-ueee');
        const resetUrl = `${frontendUrl}/#/authentication/reset-password?token=${rawToken}`;
        await this.mailService.sendPasswordReset(user.email, user.name, resetUrl);
    }
    async resetPassword(rawToken, newPassword) {
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const user = await this.usersService.findByResetToken(tokenHash);
        if (!user) {
            throw new common_1.BadRequestException('El enlace es inválido o ya expiró');
        }
        await this.usersService.resetPassword(user._id, newPassword);
    }
    async getMe(user) {
        const sidebarPermissions = await this.roleConfigService.getSidebarPermissions(user.role);
        return { ...user, sidebarPermissions };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService,
        role_config_service_1.RoleConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map