import {
  Controller, Get, Post, Put, Delete,
  Param, Query, Body, UseGuards,
} from '@nestjs/common';
import { ExpedienteAcademicoService } from './expediente-academico.service';
import { CreateExpedienteAcademicoDocumentoDto } from './dto/create-expediente-academico-documento.dto';
import { UpdateExpedienteAcademicoDocumentoDto } from './dto/update-expediente-academico-documento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('expediente-academico')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class ExpedienteAcademicoController {
  constructor(private readonly svc: ExpedienteAcademicoService) {}

  @Get('me')
  @Roles(Role.Student)
  getMyExpediente(@CurrentUser() user: any) {
    return this.svc.findMyExpediente(user.id);
  }

  @Get('parent/hijo/:studentId')
  @Roles(Role.Parent)
  getHijoExpediente(
    @Param('studentId', ParseObjectIdPipe) studentId: Types.ObjectId,
    @CurrentUser() user: any,
  ) {
    return this.svc.findHijoExpediente(user.id, studentId.toString());
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.svc.findAll(query);
  }

  @Get('secciones')
  getSecciones() {
    return this.svc.getSeccionesGlobales();
  }

  @Get('secciones/stats')
  getSeccionesStats() {
    return this.svc.getSeccionesStats();
  }

  @Delete('secciones/:seccionName')
  deleteSeccionGlobal(@Param('seccionName') seccionName: string) {
    return this.svc.deleteSeccionGlobal(seccionName);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.findByStudent(id.toString());
  }

  @Post('student/:studentId/get-or-create')
  getOrCreate(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getOrCreate(id.toString());
  }

  @Get(':id/documentos')
  getDocumentos(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getDocumentos(id.toString());
  }

  @Post(':id/documentos')
  addDocumento(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: CreateExpedienteAcademicoDocumentoDto,
  ) {
    return this.svc.addDocumento(id.toString(), dto);
  }

  @Put(':expedienteId/documentos/:docId')
  updateDocumento(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('docId', ParseObjectIdPipe) docId: Types.ObjectId,
    @Body() dto: UpdateExpedienteAcademicoDocumentoDto,
  ) {
    return this.svc.updateDocumento(expId.toString(), docId.toString(), dto);
  }

  @Delete(':expedienteId/documentos/:docId')
  deleteDocumento(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('docId', ParseObjectIdPipe) docId: Types.ObjectId,
  ) {
    return this.svc.deleteDocumento(expId.toString(), docId.toString());
  }

  @Delete(':expedienteId/secciones/:seccionName')
  deleteSeccion(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('seccionName') seccionName: string,
  ) {
    return this.svc.deleteSeccion(expId.toString(), seccionName);
  }

  @Delete(':id')
  deleteExpediente(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.deleteExpediente(id.toString());
  }
}
