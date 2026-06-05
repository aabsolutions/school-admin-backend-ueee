import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/schemas/user.schema';
import { TramiteRoleGuard } from '../guards/tramite-role.guard';
import { RequireTramiteRole } from '../decorators/tramite-role.decorator';
import { PlantillasService } from '../services/plantillas.service';
import { VariableParserService } from '../services/variable-parser.service';
import { CreatePlantillaDto } from '../dto/create-plantilla.dto';
import { UpdatePlantillaDto } from '../dto/update-plantilla.dto';
import { ParseVariablesDto } from '../dto/parse-variables.dto';
import { PlantillaQueryDto } from '../dto/plantilla-query.dto';

@Controller('plantillas')
@UseGuards(JwtAuthGuard, RolesGuard, TramiteRoleGuard)
export class PlantillasController {
  constructor(
    private readonly plantillasService: PlantillasService,
    private readonly varParser: VariableParserService,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.SuperAdmin)
  @RequireTramiteRole('TRAMITE_ADMIN')
  create(@Body() dto: CreatePlantillaDto, @Request() req: any) {
    return this.plantillasService.create(dto, req.user.id);
  }

  @Get()
  @RequireTramiteRole('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR')
  findAll(@Query() query: PlantillaQueryDto) {
    return this.plantillasService.findAll(query);
  }

  @Get('available')
  @Roles(Role.Student, Role.Teacher, Role.Parent)
  findAvailable(@Request() req: any) {
    return this.plantillasService.findAvailable(req.user.role);
  }

  @Post('parse-variables')
  @RequireTramiteRole('TRAMITE_ADMIN')
  parseVariables(@Body() dto: ParseVariablesDto) {
    return this.varParser.parse(dto.bodyHtml);
  }

  @Get(':id')
  @RequireTramiteRole('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR')
  findOne(@Param('id') id: string) {
    return this.plantillasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  @RequireTramiteRole('TRAMITE_ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdatePlantillaDto) {
    return this.plantillasService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  @RequireTramiteRole('TRAMITE_ADMIN')
  remove(@Param('id') id: string) {
    return this.plantillasService.softDelete(id);
  }
}
