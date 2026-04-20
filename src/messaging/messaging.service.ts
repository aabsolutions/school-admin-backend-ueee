import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectModel(Conversation.name) private readonly conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getConversations(userId: string): Promise<ConversationDocument[]> {
    return this.conversationModel
      .find({ 'participants.userId': new Types.ObjectId(userId) })
      .populate('lastMessage')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async createConversation(
    callerId: string,
    callerName: string,
    callerRole: string,
    dto: CreateConversationDto,
  ): Promise<ConversationDocument> {
    const allParticipantIds = [callerId, ...dto.participantIds.filter((id) => id !== callerId)];

    if (dto.type === 'direct' && allParticipantIds.length !== 2) {
      throw new BadRequestException('Direct conversations require exactly 2 participants');
    }

    if (dto.type === 'direct') {
      const existing = await this.conversationModel.findOne({
        type: 'direct',
        $and: [
          { 'participants.userId': new Types.ObjectId(allParticipantIds[0]) },
          { 'participants.userId': new Types.ObjectId(allParticipantIds[1]) },
        ],
        participants: { $size: 2 },
      });
      if (existing) return existing;
    }

    const participants = await Promise.all(
      allParticipantIds.map(async (id) => {
        if (id === callerId) {
          return { userId: new Types.ObjectId(callerId), role: callerRole, name: callerName };
        }
        const user = await this.usersService.findOne(id);
        return {
          userId: new Types.ObjectId(id),
          role: user.role,
          name: user.name,
          avatar: user.avatar,
        };
      }),
    );

    const conversation = new this.conversationModel({
      type: dto.type,
      participants,
      name: dto.name,
      createdBy: new Types.ObjectId(callerId),
    });

    return conversation.save();
  }

  async getConversation(userId: string, conversationId: string): Promise<ConversationDocument> {
    const conversation = await this.conversationModel
      .findById(conversationId)
      .populate('lastMessage')
      .exec();

    if (!conversation) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conversation, userId);
    return conversation;
  }

  async updateConversation(
    userId: string,
    conversationId: string,
    dto: UpdateConversationDto,
  ): Promise<ConversationDocument> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if (!conversation) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conversation, userId);

    if (conversation.type !== 'group') {
      throw new ForbiddenException('Only group conversations can be updated');
    }

    if (dto.name) conversation.name = dto.name;

    if (dto.addParticipantIds?.length) {
      const newParticipants = await Promise.all(
        dto.addParticipantIds.map(async (id) => {
          const alreadyIn = conversation.participants.some(
            (p) => p.userId.toString() === id,
          );
          if (alreadyIn) return null;
          const user = await this.usersService.findOne(id);
          return { userId: new Types.ObjectId(id), role: user.role, name: user.name, avatar: user.avatar };
        }),
      );
      const toAdd = newParticipants.filter(Boolean);
      conversation.participants.push(...(toAdd as any));
    }

    return conversation.save();
  }

  async getMessages(
    userId: string,
    conversationId: string,
    pagination: PaginationQueryDto,
  ): Promise<{ data: MessageDocument[]; total: number }> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if (!conversation) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conversation, userId);

    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.messageModel
        .find({ conversationId: new Types.ObjectId(conversationId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.messageModel.countDocuments({ conversationId: new Types.ObjectId(conversationId) }),
    ]);

    return { data: data.reverse(), total };
  }

  async sendMessage(
    senderId: string,
    senderName: string,
    conversationId: string,
    dto: SendMessageDto,
  ): Promise<MessageDocument> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if (!conversation) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conversation, senderId);

    const message = await new this.messageModel({
      conversationId: new Types.ObjectId(conversationId),
      senderId: new Types.ObjectId(senderId),
      senderName,
      content: dto.content,
      readBy: [{ userId: new Types.ObjectId(senderId), readAt: new Date() }],
    }).save();

    await this.conversationModel.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      updatedAt: new Date(),
    });

    const otherParticipants = conversation.participants.filter(
      (p) => p.userId.toString() !== senderId,
    );
    await Promise.all(
      otherParticipants.map((p) =>
        this.notificationsService.create(
          p.userId.toString(),
          'message',
          `Mensaje de ${senderName}`,
          message.content.length > 80 ? message.content.slice(0, 80) + '…' : message.content,
          conversation.type === 'direct' ? `/messaging` : `/messaging`,
        ),
      ),
    );

    return message;
  }

  async markRead(userId: string, conversationId: string): Promise<void> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if (!conversation) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conversation, userId);

    await this.messageModel.updateMany(
      {
        conversationId: new Types.ObjectId(conversationId),
        'readBy.userId': { $ne: new Types.ObjectId(userId) },
      },
      {
        $push: { readBy: { userId: new Types.ObjectId(userId), readAt: new Date() } },
      },
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    const conversations = await this.conversationModel
      .find({ 'participants.userId': new Types.ObjectId(userId) })
      .select('_id')
      .exec();

    const conversationIds = conversations.map((c) => c._id);

    return this.messageModel.countDocuments({
      conversationId: { $in: conversationIds },
      'readBy.userId': { $ne: new Types.ObjectId(userId) },
      senderId: { $ne: new Types.ObjectId(userId) },
    });
  }

  private assertParticipant(conversation: ConversationDocument, userId: string): void {
    const isParticipant = conversation.participants.some(
      (p) => p.userId.toString() === userId,
    );
    if (!isParticipant) throw new ForbiddenException('You are not a participant in this conversation');
  }
}
