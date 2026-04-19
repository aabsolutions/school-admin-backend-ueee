import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './schemas/user.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  findAll(@Request() req) {
    return this.usersService.findAll(req.user.role);
  }

  @Get('me')
  findMe(@Request() req) {
    return this.usersService.findMe(req.user.id);
  }

  @Patch('me')
  updateMe(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateMe(req.user.id, dto);
  }

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.usersService.findOne(id.toString());
  }

  @Post()
  @Roles(Role.SuperAdmin, Role.Admin)
  create(@Body() dto: CreateUserDto, @Request() req) {
    return this.usersService.create(dto, req.user.role);
  }

  @Put(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(id.toString(), dto, req.user.role);
  }

  @Patch(':id/status')
  @Roles(Role.SuperAdmin, Role.Admin)
  toggleStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Request() req,
  ) {
    return this.usersService.toggleStatus(id.toString(), req.user.role);
  }

  @Patch(':id/reset-password')
  @Roles(Role.SuperAdmin, Role.Admin)
  resetPassword(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Request() req,
  ) {
    return this.usersService.resetPasswordToUsername(id.toString(), req.user.role);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  remove(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Request() req,
  ) {
    return this.usersService.remove(id.toString(), req.user.role);
  }
}
