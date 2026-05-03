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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conversation_schema_1 = require("./schemas/conversation.schema");
const message_schema_1 = require("./schemas/message.schema");
const users_service_1 = require("../users/users.service");
const notifications_service_1 = require("../notifications/notifications.service");
let MessagingService = class MessagingService {
    constructor(conversationModel, messageModel, usersService, notificationsService) {
        this.conversationModel = conversationModel;
        this.messageModel = messageModel;
        this.usersService = usersService;
        this.notificationsService = notificationsService;
    }
    async getConversations(userId) {
        return this.conversationModel
            .find({ 'participants.userId': new mongoose_2.Types.ObjectId(userId) })
            .populate('lastMessage')
            .sort({ updatedAt: -1 })
            .exec();
    }
    async createConversation(callerId, callerName, callerRole, dto) {
        const allParticipantIds = [callerId, ...dto.participantIds.filter((id) => id !== callerId)];
        if (dto.type === 'direct' && allParticipantIds.length !== 2) {
            throw new common_1.BadRequestException('Direct conversations require exactly 2 participants');
        }
        if (dto.type === 'direct') {
            const existing = await this.conversationModel.findOne({
                type: 'direct',
                $and: [
                    { 'participants.userId': new mongoose_2.Types.ObjectId(allParticipantIds[0]) },
                    { 'participants.userId': new mongoose_2.Types.ObjectId(allParticipantIds[1]) },
                ],
                participants: { $size: 2 },
            });
            if (existing)
                return existing;
        }
        const participants = await Promise.all(allParticipantIds.map(async (id) => {
            if (id === callerId) {
                return { userId: new mongoose_2.Types.ObjectId(callerId), role: callerRole, name: callerName };
            }
            const user = await this.usersService.findOne(id);
            return {
                userId: new mongoose_2.Types.ObjectId(id),
                role: user.role,
                name: user.name,
                avatar: user.avatar,
            };
        }));
        const conversation = new this.conversationModel({
            type: dto.type,
            participants,
            name: dto.name,
            createdBy: new mongoose_2.Types.ObjectId(callerId),
        });
        return conversation.save();
    }
    async getConversation(userId, conversationId) {
        const conversation = await this.conversationModel
            .findById(conversationId)
            .populate('lastMessage')
            .exec();
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        this.assertParticipant(conversation, userId);
        return conversation;
    }
    async updateConversation(userId, conversationId, dto) {
        const conversation = await this.conversationModel.findById(conversationId).exec();
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        this.assertParticipant(conversation, userId);
        if (conversation.type !== 'group') {
            throw new common_1.ForbiddenException('Only group conversations can be updated');
        }
        if (dto.name)
            conversation.name = dto.name;
        if (dto.addParticipantIds?.length) {
            const newParticipants = await Promise.all(dto.addParticipantIds.map(async (id) => {
                const alreadyIn = conversation.participants.some((p) => p.userId.toString() === id);
                if (alreadyIn)
                    return null;
                const user = await this.usersService.findOne(id);
                return { userId: new mongoose_2.Types.ObjectId(id), role: user.role, name: user.name, avatar: user.avatar };
            }));
            const toAdd = newParticipants.filter(Boolean);
            conversation.participants.push(...toAdd);
        }
        return conversation.save();
    }
    async getMessages(userId, conversationId, pagination) {
        const conversation = await this.conversationModel.findById(conversationId).exec();
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        this.assertParticipant(conversation, userId);
        const { page = 1, limit = 20 } = pagination;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.messageModel
                .find({ conversationId: new mongoose_2.Types.ObjectId(conversationId) })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.messageModel.countDocuments({ conversationId: new mongoose_2.Types.ObjectId(conversationId) }),
        ]);
        return { data: data.reverse(), total };
    }
    async sendMessage(senderId, senderName, conversationId, dto) {
        const conversation = await this.conversationModel.findById(conversationId).exec();
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        this.assertParticipant(conversation, senderId);
        const message = await new this.messageModel({
            conversationId: new mongoose_2.Types.ObjectId(conversationId),
            senderId: new mongoose_2.Types.ObjectId(senderId),
            senderName,
            content: dto.content,
            readBy: [{ userId: new mongoose_2.Types.ObjectId(senderId), readAt: new Date() }],
        }).save();
        await this.conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: message._id,
            updatedAt: new Date(),
        });
        const otherParticipants = conversation.participants.filter((p) => p.userId.toString() !== senderId);
        await Promise.all(otherParticipants.map((p) => this.notificationsService.create(p.userId.toString(), 'message', `Mensaje de ${senderName}`, message.content.length > 80 ? message.content.slice(0, 80) + '…' : message.content, conversation.type === 'direct' ? `/messaging` : `/messaging`)));
        return message;
    }
    async markRead(userId, conversationId) {
        const conversation = await this.conversationModel.findById(conversationId).exec();
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        this.assertParticipant(conversation, userId);
        await this.messageModel.updateMany({
            conversationId: new mongoose_2.Types.ObjectId(conversationId),
            'readBy.userId': { $ne: new mongoose_2.Types.ObjectId(userId) },
        }, {
            $push: { readBy: { userId: new mongoose_2.Types.ObjectId(userId), readAt: new Date() } },
        });
    }
    async getUnreadCount(userId) {
        const conversations = await this.conversationModel
            .find({ 'participants.userId': new mongoose_2.Types.ObjectId(userId) })
            .select('_id')
            .exec();
        const conversationIds = conversations.map((c) => c._id);
        return this.messageModel.countDocuments({
            conversationId: { $in: conversationIds },
            'readBy.userId': { $ne: new mongoose_2.Types.ObjectId(userId) },
            senderId: { $ne: new mongoose_2.Types.ObjectId(userId) },
        });
    }
    assertParticipant(conversation, userId) {
        const isParticipant = conversation.participants.some((p) => p.userId.toString() === userId);
        if (!isParticipant)
            throw new common_1.ForbiddenException('You are not a participant in this conversation');
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_schema_1.Conversation.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService,
        notifications_service_1.NotificationsService])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map