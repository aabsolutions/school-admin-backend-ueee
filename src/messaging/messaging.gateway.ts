import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SendMessageDto } from './dto/send-message.dto';

interface AuthenticatedSocket extends Socket {
  user?: { id: string; name: string; role: string; username: string };
}

@WebSocketGateway({
  namespace: 'messaging',
  cors: { origin: true, credentials: true },
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagingGateway.name);

  constructor(
    private readonly messagingService: MessagingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.user = {
        id: payload.sub,
        name: payload.name,
        role: payload.role,
        username: payload.username,
      };

      this.logger.log(`Client connected: ${client.user.name} (${client.id})`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-conversation')
  async handleJoin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.user) return;
    try {
      await client.join(`conv-${data.conversationId}`);
      client.emit('joined', { conversationId: data.conversationId });
    } catch (err) {
      this.logger.error('join-conversation error', err);
    }
  }

  @SubscribeMessage('leave-conversation')
  async handleLeave(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    try {
      await client.leave(`conv-${data.conversationId}`);
    } catch (err) {
      this.logger.error('leave-conversation error', err);
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string; content: string },
  ) {
    if (!client.user) return;
    try {
      const dto: SendMessageDto = { content: data.content };
      const message = await this.messagingService.sendMessage(
        client.user.id,
        client.user.name,
        data.conversationId,
        dto,
      );
      this.server.to(`conv-${data.conversationId}`).emit('new-message', {
        message,
        conversationId: data.conversationId,
      });
    } catch (err) {
      this.logger.error('send-message error', err);
      client.emit('error', { message: 'No se pudo enviar el mensaje' });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.user) return;
    try {
      client.to(`conv-${data.conversationId}`).emit('typing', {
        conversationId: data.conversationId,
        userId: client.user.id,
        name: client.user.name,
      });
    } catch (err) {
      this.logger.error('typing error', err);
    }
  }

  @SubscribeMessage('mark-read')
  async handleMarkRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.user) return;
    try {
      await this.messagingService.markRead(client.user.id, data.conversationId);
      this.server.to(`conv-${data.conversationId}`).emit('message-read', {
        conversationId: data.conversationId,
        userId: client.user.id,
      });
    } catch (err) {
      this.logger.error('mark-read error', err);
    }
  }

  emitNewMessage(conversationId: string, message: any) {
    this.server.to(`conv-${conversationId}`).emit('new-message', {
      message,
      conversationId,
    });
  }

  emitConversationUpdated(conversationId: string, conversation: any) {
    this.server.to(`conv-${conversationId}`).emit('conversation-updated', conversation);
  }
}
