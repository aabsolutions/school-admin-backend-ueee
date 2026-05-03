"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MessagingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const messaging_service_1 = require("./messaging.service");
let MessagingGateway = MessagingGateway_1 = class MessagingGateway {
    constructor(messagingService, jwtService, configService) {
        this.messagingService = messagingService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(MessagingGateway_1.name);
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ||
                client.handshake.headers?.authorization?.replace('Bearer ', '');
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            client.user = {
                id: payload.sub,
                name: payload.name,
                role: payload.role,
                username: payload.username,
            };
            this.logger.log(`Client connected: ${client.user.name} (${client.id})`);
        }
        catch {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleJoin(client, data) {
        if (!client.user)
            return;
        try {
            await client.join(`conv-${data.conversationId}`);
            client.emit('joined', { conversationId: data.conversationId });
        }
        catch (err) {
            this.logger.error('join-conversation error', err);
        }
    }
    async handleLeave(client, data) {
        try {
            await client.leave(`conv-${data.conversationId}`);
        }
        catch (err) {
            this.logger.error('leave-conversation error', err);
        }
    }
    async handleSendMessage(client, data) {
        if (!client.user)
            return;
        try {
            const dto = { content: data.content };
            const message = await this.messagingService.sendMessage(client.user.id, client.user.name, data.conversationId, dto);
            this.server.to(`conv-${data.conversationId}`).emit('new-message', {
                message,
                conversationId: data.conversationId,
            });
        }
        catch (err) {
            this.logger.error('send-message error', err);
            client.emit('error', { message: 'No se pudo enviar el mensaje' });
        }
    }
    handleTyping(client, data) {
        if (!client.user)
            return;
        try {
            client.to(`conv-${data.conversationId}`).emit('typing', {
                conversationId: data.conversationId,
                userId: client.user.id,
                name: client.user.name,
            });
        }
        catch (err) {
            this.logger.error('typing error', err);
        }
    }
    async handleMarkRead(client, data) {
        if (!client.user)
            return;
        try {
            await this.messagingService.markRead(client.user.id, data.conversationId);
            this.server.to(`conv-${data.conversationId}`).emit('message-read', {
                conversationId: data.conversationId,
                userId: client.user.id,
            });
        }
        catch (err) {
            this.logger.error('mark-read error', err);
        }
    }
    emitNewMessage(conversationId, message) {
        this.server.to(`conv-${conversationId}`).emit('new-message', {
            message,
            conversationId,
        });
    }
    emitConversationUpdated(conversationId, conversation) {
        this.server.to(`conv-${conversationId}`).emit('conversation-updated', conversation);
    }
};
exports.MessagingGateway = MessagingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-conversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-conversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mark-read'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleMarkRead", null);
exports.MessagingGateway = MessagingGateway = MessagingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'messaging',
        cors: { origin: true, credentials: true },
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        jwt_1.JwtService,
        config_1.ConfigService])
], MessagingGateway);
//# sourceMappingURL=messaging.gateway.js.map