import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateTeacherFamilyInfoDto } from './dto/update-family-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  // ─── Rutas /me — DEBEN ir antes de /:id ───────────────────────────────────

  @Get('me')
  @Roles(Role.Teacher)
  getMe(@CurrentUser() user: any) {
    return this.teachersService.findByUserId(user.id);
  }

  @Patch('me/medical')
  @Roles(Role.Teacher)
  updateMyMedical(@CurrentUser() user: any, @Body() dto: UpdateTeacherMedicalInfoDto) {
    return this.teachersService.findByUserId(user.id).then(t =>
      this.teachersService.updateMedicalInfo(t._id.toString(), dto),
    );
  }

  @Patch('me/family')
  @Roles(Role.Teacher)
  updateMyFamily(@CurrentUser() user: any, @Body() dto: UpdateTeacherFamilyInfoDto) {
    return this.teachersService.findByUserId(user.id).then(t =>
      this.teachersService.updateFamilyInfo(t._id.toString(), dto),
    );
  }

  // ─── Reporte médico (solo admin) ──────────────────────────────────────────

  @Get('reporte-medico')
  @Roles(Role.SuperAdmin, Role.Admin)
  getReporteMedico(@Query() filters: any) {
    return this.teachersService.getReporteMedico(filters);
  }

  // ─── CRUD estándar ────────────────────────────────────────────────────────

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.teachersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.teachersService.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() dto: UpdateTeacherDto) {
    return this.teachersService.update(id.toString(), dto);
  }

  @Patch(':id/medical')
  updateMedical(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateTeacherMedicalInfoDto,
  ) {
    return this.teachersService.updateMedicalInfo(id.toString(), dto);
  }

  @Patch(':id/family')
  updateFamily(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateTeacherFamilyInfoDto,
  ) {
    return this.teachersService.updateFamilyInfo(id.toString(), dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.teachersService.remove(id.toString());
  }
}
