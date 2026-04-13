import {
  Controller, Get, Post, Put, Delete,
  Param, Query, Body,
  UseInterceptors, UploadedFiles,
  UseGuards, BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { DeceService } from './dece.service';
import { CreateDeceExpedienteDto } from './dto/create-dece-expediente.dto';
import { CreateDeceRegistroDto } from './dto/create-dece-registro.dto';
import { UpdateDeceRegistroDto } from './dto/update-dece-registro.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

class DeleteEvidenciaDto {
  @IsString() @IsNotEmpty() url: string;
}

const ALLOWED_MIME = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

@Controller('dece')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class DeceController {
  constructor(
    private readonly svc: DeceService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Get('me')
  @Roles(Role.Student)
  getMyExpediente(@CurrentUser() user: any) {
    return this.svc.findByUserIdWithRegistros(user.id);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) { return this.svc.findAll(query); }

  @Get('reporte')
  getReporte(
    @Query('fechaDesde') fechaDesde?: string,
    @Query('fechaHasta') fechaHasta?: string,
    @Query('tipo') tipo?: string,
    @Query('creadoPor') creadoPor?: string,
    @Query('studentId') studentId?: string,
  ) {
    return this.svc.getReporte({ fechaDesde, fechaHasta, tipo, creadoPor, studentId });
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.findByStudent(id.toString());
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateDeceExpedienteDto) { return this.svc.create(dto); }

  @Post('student/:studentId/get-or-create')
  getOrCreate(@Param('studentId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getOrCreate(id.toString());
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.remove(id.toString());
  }

  @Get(':id/registros')
  getRegistros(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getRegistros(id.toString());
  }

  @Post(':id/registros')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME.includes(file.mimetype))
          return cb(new BadRequestException(`Tipo no permitido: ${file.mimetype}`), false);
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async addRegistro(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: CreateDeceRegistroDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    const evidencias = await Promise.all(
      (files ?? []).map(f => this.cloudinary.uploadBuffer(f.buffer, 'dece')),
    );
    return this.svc.addRegistro(id.toString(), dto, evidencias);
  }

  @Put(':expedienteId/registros/:registroId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME.includes(file.mimetype))
          return cb(new BadRequestException(`Tipo no permitido: ${file.mimetype}`), false);
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async updateRegistro(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('registroId', ParseObjectIdPipe)   regId: Types.ObjectId,
    @Body() dto: UpdateDeceRegistroDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    const newEvidencias = await Promise.all(
      (files ?? []).map(f => this.cloudinary.uploadBuffer(f.buffer, 'dece')),
    );
    return this.svc.updateRegistro(expId.toString(), regId.toString(), dto, newEvidencias);
  }

  @Delete(':expedienteId/registros/:registroId')
  deleteRegistro(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('registroId', ParseObjectIdPipe)   regId: Types.ObjectId,
  ) {
    return this.svc.deleteRegistro(expId.toString(), regId.toString());
  }

  /** Removes a single evidencia file — SuperAdmin only */
  @Delete(':expedienteId/registros/:registroId/evidencias')
  @Roles(Role.SuperAdmin)
  async deleteEvidencia(
    @Param('expedienteId', ParseObjectIdPipe) expId: Types.ObjectId,
    @Param('registroId', ParseObjectIdPipe)   regId: Types.ObjectId,
    @Body() dto: DeleteEvidenciaDto,
  ) {
    const updated = await this.svc.deleteEvidencia(expId.toString(), regId.toString(), dto.url);
    this.cloudinary.deleteByUrl(dto.url).catch(() => null);
    return updated;
  }
}
