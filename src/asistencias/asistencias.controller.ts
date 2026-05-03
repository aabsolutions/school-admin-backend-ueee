import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AsistenciasService } from './asistencias.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SaveAttendanceDto } from './dto/save-attendance.dto';
import { AttendanceQueryDto } from './dto/attendance-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { Role } from '../users/schemas/user.schema';

@Controller('asistencias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  // ─── CONFIG (Admin/SuperAdmin) ──────────────────────────────────────────────

  @Post('assignments')
  @Roles(Role.Admin, Role.SuperAdmin)
  createAssignment(@Body() dto: CreateAssignmentDto) {
    return this.asistenciasService.createAssignment(dto);
  }

  @Get('assignments')
  @Roles(Role.Admin, Role.SuperAdmin)
  findAllAssignments(@Query() query: PaginationQueryDto) {
    return this.asistenciasService.findAllAssignments(query);
  }

  // NOTE: /me must come before /:id to avoid route collision
  @Get('assignments/me')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Teacher, Role.Student, Role.Parent)
  getMyAssignment(@CurrentUser() user: any) {
    return this.asistenciasService.getMyAssignment(user.id);
  }

  @Delete('assignments/:id')
  @Roles(Role.Admin, Role.SuperAdmin)
  deleteAssignment(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.asistenciasService.deleteAssignment(id.toString());
  }

  // ─── RECORDS ───────────────────────────────────────────────────────────────

  @Post('records')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Teacher)
  saveAttendance(@Body() dto: SaveAttendanceDto, @CurrentUser() user: any) {
    return this.asistenciasService.saveAttendance(dto, user.id);
  }

  // NOTE: static routes before parameterized ones
  @Get('records/mine')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Teacher)
  getMyRecords(@CurrentUser() user: any, @Query() query: AttendanceQueryDto) {
    return this.asistenciasService.getMyRecords(user.id, query);
  }

  @Get('records/consolidated')
  @Roles(Role.Admin, Role.SuperAdmin)
  getConsolidated(
    @Query('cursoLectivoId') cursoLectivoId: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    return this.asistenciasService.getConsolidated(
      cursoLectivoId,
      dateFrom,
      dateTo,
    );
  }

  @Get('records/my-children')
  @Roles(Role.Parent)
  getMyChildrenAttendance(
    @CurrentUser() user: any,
    @Query() query: AttendanceQueryDto,
  ) {
    return this.asistenciasService.getMyChildrenAttendance(user.id, query);
  }

  @Get('records/student/:id')
  @Roles(Role.Admin, Role.SuperAdmin, Role.Teacher, Role.Student)
  getStudentHistory(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Query() query: AttendanceQueryDto,
  ) {
    return this.asistenciasService.getStudentHistory(id.toString(), query);
  }

  @Get('records')
  @Roles(Role.Admin, Role.SuperAdmin)
  findAllRecords(@Query() query: AttendanceQueryDto) {
    return this.asistenciasService.findAllRecords(query);
  }
}
