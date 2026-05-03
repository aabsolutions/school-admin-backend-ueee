import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MessagingService } from './messaging.service';
interface AuthenticatedSocket extends Socket {
    user?: {
        id: string;
        name: string;
        role: string;
        username: string;
    };
}
export declare class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagingService;
    private readonly jwtService;
    private readonly configService;
    server: Server;
    private readonly logger;
    constructor(messagingService: MessagingService, jwtService: JwtService, configService: ConfigService);
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleJoin(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): Promise<void>;
    handleLeave(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): Promise<void>;
    handleSendMessage(client: AuthenticatedSocket, data: {
        conversationId: string;
        content: string;
    }): Promise<void>;
    handleTyping(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): void;
    handleMarkRead(client: AuthenticatedSocket, data: {
        conversationId: string;
    }): Promise<void>;
    emitNewMessage(conversationId: string, message: any): void;
    emitConversationUpdated(conversationId: string, conversation: any): void;
}
export {};
