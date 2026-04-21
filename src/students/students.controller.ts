import {
  Controller, Get, Post, Put, Patch, Delete,
  Body, Param, Query, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe,
  MaxFileSizeValidator, FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateStudentMedicalInfoDto } from './dto/update-medical-info.dto';
import { UpdateStudentFamilyInfoDto } from './dto/update-family-info.dto';
import { UpdateStudentGeneralDto } from './dto/update-student-general.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // ─── Rutas /me — DEBEN ir antes de /:id ───────────────────────────────────

  @Get('me')
  @Roles(Role.Student)
  getMe(@CurrentUser() user: any) {
    return this.studentsService.findByUserId(user.id);
  }

  @Patch('me')
  @Roles(Role.Student)
  updateMyGeneral(@CurrentUser() user: any, @Body() dto: UpdateStudentGeneralDto) {
    return this.studentsService.findByUserId(user.id).then(s =>
      this.studentsService.updateGeneralInfo(s._id.toString(), dto),
    );
  }

  @Patch('me/medical')
  @Roles(Role.Student)
  updateMyMedical(@CurrentUser() user: any, @Body() dto: UpdateStudentMedicalInfoDto) {
    return this.studentsService.findByUserId(user.id).then(s =>
      this.studentsService.updateMedicalInfo(s._id.toString(), dto),
    );
  }

  @Patch('me/family')
  @Roles(Role.Student)
  updateMyFamily(@CurrentUser() user: any, @Body() dto: UpdateStudentFamilyInfoDto) {
    return this.studentsService.findByUserId(user.id).then(s =>
      this.studentsService.updateFamilyInfo(s._id.toString(), dto),
    );
  }

  // ─── Reporte médico (solo admin) ──────────────────────────────────────────

  @Get('reporte-medico')
  @Roles(Role.SuperAdmin, Role.Admin)
  getReporteMedico(@Query() filters: any) {
    return this.studentsService.getReporteMedico(filters);
  }

  // ─── CRUD estándar ────────────────────────────────────────────────────────

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin, Role.Teacher)
  findAll(@Query() query: PaginationQueryDto) {
    return this.studentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.studentsService.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id.toString(), dto);
  }

  @Patch(':id/status')
  toggleStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body('status') status: string,
  ) {
    return this.studentsService.toggleStatus(id.toString(), status);
  }

  @Patch(':id/medical')
  updateMedical(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateStudentMedicalInfoDto,
  ) {
    return this.studentsService.updateMedicalInfo(id.toString(), dto);
  }

  @Patch(':id/family')
  updateFamily(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateStudentFamilyInfoDto,
  ) {
    return this.studentsService.updateFamilyInfo(id.toString(), dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.studentsService.remove(id.toString());
  }

  @Post(':id/photo')
  @Roles(Role.Student, Role.Teacher, Role.Admin, Role.SuperAdmin)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadPhoto(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('type') type: 'credencial' | 'cuerpo',
    @Body('peso') peso?: string,
    @Body('talla') talla?: string,
  ) {
    return this.studentsService.uploadPhoto(
      id.toString(), file, type,
      peso ? +peso : undefined,
      talla ? +talla : undefined,
    );
  }
}
