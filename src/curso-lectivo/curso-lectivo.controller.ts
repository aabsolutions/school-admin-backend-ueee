import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CursoLectivoService } from './curso-lectivo.service';
import { CreateCursoLectivoDto } from './dto/create-curso-lectivo.dto';
import { UpdateCursoLectivoDto } from './dto/update-curso-lectivo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Types } from 'mongoose';

@Controller('curso-lectivo')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class CursoLectivoController {
  constructor(private readonly cursoLectivoService: CursoLectivoService) {}

  @Get('mi-tutor-alumnos')
  @Roles(Role.Teacher)
  getMiTutorAlumnos(@CurrentUser() user: any) {
    return this.cursoLectivoService.findTutorAlumnos(user.id);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto & { academicYear?: string; status?: string; cursoId?: string }) {
    return this.cursoLectivoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.cursoLectivoService.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateCursoLectivoDto) {
    return this.cursoLectivoService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() dto: UpdateCursoLectivoDto) {
    return this.cursoLectivoService.update(id.toString(), dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.cursoLectivoService.remove(id.toString());
  }
}
