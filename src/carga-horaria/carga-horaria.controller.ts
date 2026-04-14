import { Controller, Get, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CargaHorariaService } from './carga-horaria.service';
import { SetAsignacionDto } from './dto/set-asignacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';

@Controller('carga-horaria')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class CargaHorariaController {
  constructor(private readonly service: CargaHorariaService) {}

  /**
   * GET /carga-horaria/curso-lectivo/:id
   * Todas las asignaciones del curso lectivo.
   */
  @Get('curso-lectivo/:id')
  findByCursoLectivo(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.service.findByCursoLectivo(id.toString());
  }

  /**
   * GET /carga-horaria/curso-lectivo/:id/disponibles?docenteId=X
   * Materias disponibles (no tomadas por otro docente) + las ya asignadas al docente.
   */
  @Get('curso-lectivo/:id/disponibles')
  getDisponibles(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Query('docenteId') docenteId: string,
  ) {
    return this.service.getDisponibles(id.toString(), docenteId);
  }

  /**
   * PUT /carga-horaria/curso-lectivo/:id/docente/:docenteId
   * Establece las materias del docente en el curso lectivo (reemplaza).
   */
  @Put('curso-lectivo/:id/docente/:docenteId')
  setAsignacion(
    @Param('id', ParseObjectIdPipe)       id:       Types.ObjectId,
    @Param('docenteId', ParseObjectIdPipe) docenteId: Types.ObjectId,
    @Body() dto: SetAsignacionDto,
  ) {
    return this.service.setAsignacion(id.toString(), docenteId.toString(), dto);
  }
}
