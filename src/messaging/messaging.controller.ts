import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(
    private readonly messagingService: MessagingService,
    private readonly messagingGateway: MessagingGateway,
    private readonly usersService: UsersService,
  ) {}

  @Get('conversations')
  getConversations(@CurrentUser() user: any) {
    return this.messagingService.getConversations(user.id);
  }

  @Post('conversations')
  createConversation(@CurrentUser() user: any, @Body() dto: CreateConversationDto) {
    return this.messagingService.createConversation(user.id, user.name, user.role, dto);
  }

  @Get('conversations/:id')
  getConversation(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
  ) {
    return this.messagingService.getConversation(user.id, id.toString());
  }

  @Patch('conversations/:id')
  updateConversation(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
    @Body() dto: UpdateConversationDto,
  ) {
    return this.messagingService.updateConversation(user.id, id.toString(), dto);
  }

  @Get('conversations/:id/messages')
  getMessages(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.messagingService.getMessages(user.id, id.toString(), pagination);
  }

  @Post('conversations/:id/messages')
  async sendMessage(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
    @Body() dto: SendMessageDto,
  ) {
    const conversationId = id.toString();
    const message = await this.messagingService.sendMessage(user.id, user.name, conversationId, dto);
    this.messagingGateway.emitNewMessage(conversationId, message);
    return message;
  }

  @Patch('conversations/:id/read')
  markRead(
    @CurrentUser() user: any,
    @Param('id', ParseObjectIdPipe) id: any,
  ) {
    return this.messagingService.markRead(user.id, id.toString());
  }

  @Get('unread-count')
  getUnreadCount(@CurrentUser() user: any) {
    return this.messagingService.getUnreadCount(user.id);
  }

  @Get('users')
  getUsers() {
    return this.usersService.findAllForMessaging();
  }
}
