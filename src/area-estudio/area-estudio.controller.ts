import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AreaEstudioService } from './area-estudio.service';
import { CreateAreaEstudioDto } from './dto/create-area-estudio.dto';
import { UpdateAreaEstudioDto } from './dto/update-area-estudio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';

@Controller('area-estudio')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin)
export class AreaEstudioController {
  constructor(private readonly service: AreaEstudioService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.service.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateAreaEstudioDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateAreaEstudioDto,
  ) {
    return this.service.update(id.toString(), dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.service.remove(id.toString());
  }
}
