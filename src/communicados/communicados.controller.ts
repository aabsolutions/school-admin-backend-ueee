import {
  Controller, Get, Post, Patch,
  Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { CommunicadosService } from './communicados.service';
import { CreateCommunicadoDto } from './dto/create-communicado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('communicados')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommunicadosController {
  constructor(private readonly svc: CommunicadosService) {}

  @Post()
  @Roles(Role.Teacher, Role.Admin, Role.SuperAdmin)
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateCommunicadoDto,
  ) {
    return this.svc.create(user.id, dto);
  }

  @Get('teacher')
  @Roles(Role.Teacher, Role.Admin, Role.SuperAdmin)
  findByTeacher(
    @CurrentUser() user: any,
    @Query() query: PaginationQueryDto,
  ) {
    return this.svc.findByTeacher(user.id, query);
  }

  @Get('parent')
  @Roles(Role.Parent)
  findByParent(
    @CurrentUser() user: any,
    @Query() query: PaginationQueryDto,
  ) {
    return this.svc.findByParent(user.id, query);
  }

  @Get(':id')
  @Roles(Role.Teacher, Role.Admin, Role.SuperAdmin, Role.Parent)
  findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: any,
  ) {
    return this.svc.findOne(id.toString(), user.id);
  }

  @Patch(':id/received')
  @Roles(Role.Parent)
  markReceived(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: any,
  ) {
    return this.svc.markReceived(id.toString(), user.id);
  }
}
