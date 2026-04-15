import {
  Controller, Get, Put, Post, Body, UseGuards,
  UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InstitucionService } from './institucion.service';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/schemas/user.schema';

@Controller('institucion')
export class InstitucionController {
  constructor(private readonly service: InstitucionService) {}

  /**
   * GET /institucion — Público: datos institucionales para reportes, header, etc.
   */
  @Get()
  getInstitucion() {
    return this.service.getInstitucion();
  }

  /**
   * PUT /institucion — Solo SuperAdmin
   */
  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  updateInstitucion(@Body() dto: UpdateInstitucionDto) {
    return this.service.updateInstitucion(dto);
  }

  /**
   * POST /institucion/logo — Solo SuperAdmin, sube logotipo a Cloudinary
   */
  @Post('logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|svg\+xml)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.service.uploadLogo(file);
  }
}
