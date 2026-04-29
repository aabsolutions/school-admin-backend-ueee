import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoleConfigService } from './role-config.service';
import { CreateRoleConfigDto } from './dto/create-role-config.dto';
import { UpdateRoleConfigDto } from './dto/update-role-config.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/schemas/user.schema';
import { IsArray, IsString } from 'class-validator';

class UpdatePermissionsDto {
  @IsArray()
  @IsString({ each: true })
  sidebarPermissions: string[];
}

@Controller('role-configs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleConfigController {
  constructor(private readonly service: RoleConfigService) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @Roles(Role.SuperAdmin)
  create(@Body() dto: CreateRoleConfigDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(Role.SuperAdmin)
  update(@Param('id') id: string, @Body() dto: UpdateRoleConfigDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/permissions')
  @Roles(Role.SuperAdmin)
  updatePermissions(@Param('id') id: string, @Body() dto: UpdatePermissionsDto) {
    return this.service.updatePermissions(id, dto.sidebarPermissions);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
