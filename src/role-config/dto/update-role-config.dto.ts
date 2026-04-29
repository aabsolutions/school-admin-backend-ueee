import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleConfigDto } from './create-role-config.dto';

export class UpdateRoleConfigDto extends PartialType(CreateRoleConfigDto) {}
