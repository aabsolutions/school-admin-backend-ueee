import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TRAMITE_ROLE_KEY } from '../decorators/tramite-role.decorator';

@Injectable()
export class TramiteRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(TRAMITE_ROLE_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required?.length) return true;
    const { user } = ctx.switchToHttp().getRequest();
    if (user?.role === 'SUPERADMIN' || user?.role === 'ADMIN') return true;
    return required.includes(user?.role);
  }
}
