import {
  Controller,
  Get, Post, Delete,
  Param, Query, Body,
  UseGuards, UseInterceptors,
  UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { DocumentalDocenteService } from './documental-docente.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TeachersService } from '../teachers/teachers.service';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

const ALLOWED_MIME = [
  'image/jpeg', 'image/png', 'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

class UploadDocumentoDto {
  @IsString() @IsNotEmpty() nombre: string;
  @IsString() @IsIn(['profesional', 'planificacion']) categoria: 'profesional' | 'planificacion';
  @IsOptional() @IsString() descripcion?: string;
}

@Controller('documental-docente')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentalDocenteController {
  constructor(
    private readonly svc: DocumentalDocenteService,
    private readonly cloudinary: CloudinaryService,
    private readonly teachersService: TeachersService,
  ) {}

  // ─── Admin / SuperAdmin ────────────────────────────────────────────────────

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  findAll(@Query() query: PaginationQueryDto) {
    return this.svc.findAll(query);
  }

  @Get('teacher/:teacherId')
  @Roles(Role.SuperAdmin, Role.Admin)
  getByTeacher(@Param('teacherId', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.svc.getOrCreate(id.toString());
  }

  @Post('teacher/:teacherId/documentos')
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME.includes(file.mimetype)) {
          return cb(
            new BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadForTeacher(
    @Param('teacherId', ParseObjectIdPipe) teacherId: Types.ObjectId,
    @Body() dto: UploadDocumentoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('El archivo es requerido');
    const url = await this.cloudinary.uploadBuffer(file.buffer, 'documental-docente');
    return this.svc.addDocumento(
      teacherId.toString(),
      dto.nombre,
      dto.categoria,
      url,
      dto.descripcion,
    );
  }

  @Delete('teacher/:teacherId/documentos/:docId')
  @Roles(Role.SuperAdmin, Role.Admin)
  async deleteForTeacher(
    @Param('teacherId', ParseObjectIdPipe) teacherId: Types.ObjectId,
    @Param('docId') docId: string,
  ) {
    const { url, record } = await this.svc.deleteDocumento(teacherId.toString(), docId);
    this.cloudinary.deleteByUrl(url).catch(() => null);
    return record;
  }

  // ─── Teacher self-service ──────────────────────────────────────────────────

  @Get('me')
  @Roles(Role.Teacher)
  async getMe(@CurrentUser() user: any) {
    const teacher = await this.teachersService.findByUserId(user.id);
    return this.svc.getOrCreate(teacher._id.toString());
  }

  @Post('me/documentos')
  @Roles(Role.Teacher)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME.includes(file.mimetype)) {
          return cb(
            new BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadMe(
    @CurrentUser() user: any,
    @Body() dto: UploadDocumentoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('El archivo es requerido');
    const teacher = await this.teachersService.findByUserId(user.id);
    const url = await this.cloudinary.uploadBuffer(file.buffer, 'documental-docente');
    return this.svc.addDocumento(
      teacher._id.toString(),
      dto.nombre,
      dto.categoria,
      url,
      dto.descripcion,
    );
  }

  @Delete('me/documentos/:docId')
  @Roles(Role.Teacher)
  async deleteMe(
    @CurrentUser() user: any,
    @Param('docId') docId: string,
  ) {
    const teacher = await this.teachersService.findByUserId(user.id);
    const { url, record } = await this.svc.deleteDocumento(
      teacher._id.toString(),
      docId,
    );
    this.cloudinary.deleteByUrl(url).catch(() => null);
    return record;
  }
}
