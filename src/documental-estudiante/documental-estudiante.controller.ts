import {
  Controller,
  Get, Post, Put,
  Param, Query, Body,
  UseGuards,
} from '@nestjs/common';
import { DocumentalEstudianteService } from './documental-estudiante.service';
import { UpdateDocumentalEstudianteDto } from './dto/update-documental-estudiante.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';
import { StudentsService } from '../students/students.service';

@Controller('documental-estudiante')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentalEstudianteController {
  constructor(
    private readonly svc: DocumentalEstudianteService,
    private readonly studentsService: StudentsService,
  ) {}

  // ─── Admin / SuperAdmin ────────────────────────────────────────────────────

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  findAll(@Query() query: PaginationQueryDto) {
    return this.svc.findAll(query);
  }

  @Get('student/:studentId')
  @Roles(Role.SuperAdmin, Role.Admin)
  findByStudent(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.findByStudent(id.toString());
  }

  @Post('student/:studentId/get-or-create')
  @Roles(Role.SuperAdmin, Role.Admin)
  getOrCreate(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getOrCreate(id.toString());
  }

  @Put(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateDocumentalEstudianteDto,
  ) {
    return this.svc.update(id.toString(), dto);
  }

  // ─── Student self-service (read-only) ─────────────────────────────────────

  @Get('me')
  @Roles(Role.Student)
  async getMe(@CurrentUser() user: any) {
    const student = await this.studentsService.findByUserId(user.id);
    return this.svc.getOrCreate(student._id.toString());
  }
}
