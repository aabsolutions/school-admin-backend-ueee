import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { Types } from 'mongoose';

@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  findAll(@Query() query: EnrollmentQueryDto) {
    return this.enrollmentsService.findAll(query);
  }

  @Get('stats')
  @Roles(Role.SuperAdmin, Role.Admin, Role.Teacher)
  getStats() {
    return this.enrollmentsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.enrollmentsService.findOne(id.toString());
  }

  @Post()
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() dto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id.toString(), dto);
  }

  @Patch(':id/withdraw')
  withdraw(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.enrollmentsService.withdraw(id.toString());
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.enrollmentsService.remove(id.toString());
  }
}
