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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingController = void 0;
const common_1 = require("@nestjs/common");
const messaging_service_1 = require("./messaging.service");
const messaging_gateway_1 = require("./messaging.gateway");
const users_service_1 = require("../users/users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const send_message_dto_1 = require("./dto/send-message.dto");
const update_conversation_dto_1 = require("./dto/update-conversation.dto");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
let MessagingController = class MessagingController {
    constructor(messagingService, messagingGateway, usersService) {
        this.messagingService = messagingService;
        this.messagingGateway = messagingGateway;
        this.usersService = usersService;
    }
    getConversations(user) {
        return this.messagingService.getConversations(user.id);
    }
    createConversation(user, dto) {
        return this.messagingService.createConversation(user.id, user.name, user.role, dto);
    }
    getConversation(user, id) {
        return this.messagingService.getConversation(user.id, id.toString());
    }
    updateConversation(user, id, dto) {
        return this.messagingService.updateConversation(user.id, id.toString(), dto);
    }
    getMessages(user, id, pagination) {
        return this.messagingService.getMessages(user.id, id.toString(), pagination);
    }
    async sendMessage(user, id, dto) {
        const conversationId = id.toString();
        const message = await this.messagingService.sendMessage(user.id, user.name, conversationId, dto);
        this.messagingGateway.emitNewMessage(conversationId, message);
        return message;
    }
    markRead(user, id) {
        return this.messagingService.markRead(user.id, id.toString());
    }
    getUnreadCount(user) {
        return this.messagingService.getUnreadCount(user.id);
    }
    getUsers() {
        return this.usersService.findAllForMessaging();
    }
};
exports.MessagingController = MessagingController;
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Post)('conversations'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('conversations/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Patch)('conversations/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_conversation_dto_1.UpdateConversationDto]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "updateConversation", null);
__decorate([
    (0, common_1.Get)('conversations/:id/messages'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('conversations/:id/messages'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], MessagingController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)('conversations/:id/read'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "markRead", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getUsers", null);
exports.MessagingController = MessagingController = __decorate([
    (0, common_1.Controller)('messaging'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        messaging_gateway_1.MessagingGateway,
        users_service_1.UsersService])
], MessagingController);
//# sourceMappingURL=messaging.controller.js.map