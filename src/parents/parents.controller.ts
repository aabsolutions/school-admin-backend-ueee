import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { LinkStudentsDto } from './dto/link-students.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('parents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParentsController {
  constructor(private readonly svc: ParentsService) {}

  // ── Admin endpoints ──────────────────────────────────────────────────────

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  findAll(@Query() query: PaginationQueryDto) {
    return this.svc.findAll(query);
  }

  @Post()
  @Roles(Role.Admin, Role.SuperAdmin)
  create(@Body() dto: CreateParentDto) {
    return this.svc.create(dto);
  }

  @Get('search')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Teacher)
  search(@Query('q') q: string = '', @Query('studentId') studentId?: string) {
    return this.svc.searchByName(q, studentId);
  }

  // ── Parent self endpoints ─────────────────────────────────────────────────

  @Get('me')
  @Roles(Role.Parent)
  getMe(@CurrentUser() user: any) {
    return this.svc.findByUserId(user.id);
  }

  @Get('me/hijos')
  @Roles(Role.Parent)
  getHijos(@CurrentUser() user: any) {
    return this.svc.getHijos(user.id);
  }

  // ── Admin by-id endpoints ─────────────────────────────────────────────────

  @Get(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.findOne(id.toString());
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateParentDto,
  ) {
    return this.svc.update(id.toString(), dto);
  }

  @Post(':id/link')
  @Roles(Role.Admin, Role.SuperAdmin)
  linkStudents(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: LinkStudentsDto,
  ) {
    return this.svc.linkStudents(id.toString(), dto.studentIds);
  }

  @Delete(':id/unlink/:studentId')
  @Roles(Role.Admin, Role.SuperAdmin)
  unlinkStudent(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Param('studentId', ParseObjectIdPipe) studentId: Types.ObjectId,
  ) {
    return this.svc.unlinkStudent(id.toString(), studentId.toString());
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.remove(id.toString());
  }
}
