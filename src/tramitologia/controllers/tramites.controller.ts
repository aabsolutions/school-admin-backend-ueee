import {
  Controller, Get, Post, Patch, Body, Param, Query, Request, Response,
  UseGuards, UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/schemas/user.schema';
import { TramiteRoleGuard } from '../guards/tramite-role.guard';
import { RequireTramiteRole } from '../decorators/tramite-role.decorator';
import { TramitesService } from '../services/tramites.service';
import { TramiteWorkflowService } from '../services/tramite-workflow.service';
import { PdfService } from '../services/pdf.service';
import { CreateTramiteDto } from '../dto/create-tramite.dto';
import { TransitionTramiteDto } from '../dto/transition-tramite.dto';
import { UploadAttachmentDto } from '../dto/upload-attachment.dto';
import { TramiteQueryDto } from '../dto/tramite-query.dto';
import { SkipTransform } from '../../common/decorators/skip-transform.decorator';
import type { Response as ExpressResponse } from 'express';

@Controller('tramites')
@UseGuards(JwtAuthGuard, RolesGuard, TramiteRoleGuard)
export class TramitesController {
  constructor(
    private readonly tramitesService: TramitesService,
    private readonly workflowService: TramiteWorkflowService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  @Roles(Role.Student, Role.Teacher, Role.Parent)
  create(@Body() dto: CreateTramiteDto, @Request() req: any) {
    return this.tramitesService.create(dto, {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      username: req.user.username,
    });
  }

  @Post(':id/attachments')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  addAttachment(
    @Param('id') id: string,
    @Body() dto: UploadAttachmentDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    if (!file) throw new BadRequestException('El archivo es requerido');
    return this.tramitesService.addAttachment(id, file, dto.name, req.user.id);
  }

  @Get('mine')
  @Roles(Role.Student, Role.Teacher, Role.Parent)
  findMine(@Request() req: any, @Query() query: TramiteQueryDto) {
    return this.tramitesService.findMine(req.user.id, query);
  }

  @Get('inbox')
  @RequireTramiteRole('TRAMITE_OPERATIVO')
  findInbox(@Request() req: any, @Query() query: TramiteQueryDto) {
    return this.tramitesService.findInbox(req.user.id, query);
  }

  @Get('operatives')
  findOperatives() {
    return this.tramitesService.findOperatives();
  }

  @Get()
  @RequireTramiteRole('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR')
  findAll(@Query() query: TramiteQueryDto) {
    return this.tramitesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tramite = await this.tramitesService.findById(id);
    const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
    if (!this.tramitesService.canAccess(tramite, user)) {
      throw new BadRequestException('Sin acceso a este trámite');
    }
    return tramite;
  }

  @Get(':id/history')
  async getHistory(@Param('id') id: string, @Request() req: any) {
    const tramite = await this.tramitesService.findById(id);
    const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
    if (!this.tramitesService.canAccess(tramite, user)) {
      throw new BadRequestException('Sin acceso a este trámite');
    }
    return this.tramitesService.findHistory(id);
  }

  @Get(':id/pdf')
  @SkipTransform()
  async getPdf(
    @Param('id') id: string,
    @Request() req: any,
    @Response() res: ExpressResponse,
  ) {
    const tramite = await this.tramitesService.findById(id);
    const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
    if (!this.tramitesService.canAccess(tramite, user)) {
      throw new BadRequestException('Sin acceso a este trámite');
    }
    const buffer = await this.pdfService.generatePdf(tramite.renderedHtml);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${tramite.codigo}.pdf"`);
    res.send(buffer);
  }

  @Patch(':id/transition')
  @RequireTramiteRole('TRAMITE_ADMIN', 'TRAMITE_OPERATIVO')
  transition(
    @Param('id') id: string,
    @Body() dto: TransitionTramiteDto,
    @Request() req: any,
  ) {
    return this.workflowService.transitionState(id, dto.newState, {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
    }, dto.observation);
  }
}
