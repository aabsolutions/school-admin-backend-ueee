import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/schemas/user.schema';
import { ROLES_KEY } from '../decorators/roles.decorator';

const SYSTEM_ROLES = new Set<string>(Object.values(Role));

const ROLE_HIERARCHY: Record<string, string[]> = {
  [Role.SuperAdmin]: [Role.SuperAdmin, Role.Admin, Role.Teacher, Role.Student, Role.Parent],
  [Role.Admin]: [Role.Admin, Role.Teacher, Role.Student, Role.Parent],
  [Role.Teacher]: [Role.Teacher],
  [Role.Student]: [Role.Student],
  [Role.Parent]: [Role.Parent],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const userRole: string = user.role;

    // Custom roles (not in the system enum) behave like Admin
    if (!SYSTEM_ROLES.has(userRole)) {
      const adminAllowed = ROLE_HIERARCHY[Role.Admin] ?? [];
      return requiredRoles.some((required) => adminAllowed.includes(required));
    }

    const allowedRoles = ROLE_HIERARCHY[userRole] ?? [];
    return requiredRoles.some((required) => allowedRoles.includes(required));
  }
}
