import {
  Controller, Get, Patch, Delete, Post, Param, Query,
  UseGuards, Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { BroadcastNotificationDto } from './dto/broadcast-notification.dto';
import { Role } from '../users/schemas/user.schema';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

class PaginationDto {
  @IsOptional() @Type(() => Number) @IsPositive() page?: number = 1;
  @IsOptional() @Type(() => Number) @IsPositive() limit?: number = 20;
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
    return this.notificationsService.findForUser(user.id, pagination.page, pagination.limit);
  }

  @Get('unread-count')
  getUnreadCount(@CurrentUser() user: any) {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser() user: any) {
    return this.notificationsService.markAllRead(user.id);
  }

  @Patch(':id/read')
  markRead(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
  ) {
    return this.notificationsService.markRead(user.id, id.toString());
  }

  @Delete(':id')
  deleteOne(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
  ) {
    return this.notificationsService.deleteOne(user.id, id.toString());
  }

  @Post('broadcast')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  broadcast(@Body() dto: BroadcastNotificationDto) {
    return this.notificationsService.broadcast(dto);
  }
}
