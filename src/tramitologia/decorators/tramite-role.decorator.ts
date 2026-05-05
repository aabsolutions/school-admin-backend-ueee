import { SetMetadata } from '@nestjs/common';

export const TRAMITE_ROLE_KEY = 'tramiteRoles';
export const RequireTramiteRole = (...roles: string[]) => SetMetadata(TRAMITE_ROLE_KEY, roles);
