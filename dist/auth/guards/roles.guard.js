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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_schema_1 = require("../../users/schemas/user.schema");
const roles_decorator_1 = require("../decorators/roles.decorator");
const SYSTEM_ROLES = new Set(Object.values(user_schema_1.Role));
const ROLE_HIERARCHY = {
    [user_schema_1.Role.SuperAdmin]: [user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin, user_schema_1.Role.Teacher, user_schema_1.Role.Student, user_schema_1.Role.Parent],
    [user_schema_1.Role.Admin]: [user_schema_1.Role.Admin, user_schema_1.Role.Teacher, user_schema_1.Role.Student, user_schema_1.Role.Parent],
    [user_schema_1.Role.Teacher]: [user_schema_1.Role.Teacher],
    [user_schema_1.Role.Student]: [user_schema_1.Role.Student],
    [user_schema_1.Role.Parent]: [user_schema_1.Role.Parent],
};
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0)
            return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user)
            return false;
        const userRole = user.role;
        if (!SYSTEM_ROLES.has(userRole)) {
            const adminAllowed = ROLE_HIERARCHY[user_schema_1.Role.Admin] ?? [];
            return requiredRoles.some((required) => adminAllowed.includes(required));
        }
        const allowedRoles = ROLE_HIERARCHY[userRole] ?? [];
        return requiredRoles.some((required) => allowedRoles.includes(required));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map