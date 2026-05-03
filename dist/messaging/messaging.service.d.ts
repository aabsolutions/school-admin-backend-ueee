import { Model } from 'mongoose';
import { ConversationDocument } from './schemas/conversation.schema';
import { MessageDocument } from './schemas/message.schema';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class MessagingService {
    private readonly conversationModel;
    private readonly messageModel;
    private readonly usersService;
    private readonly notificationsService;
    constructor(conversationModel: Model<ConversationDocument>, messageModel: Model<MessageDocument>, usersService: UsersService, notificationsService: NotificationsService);
    getConversations(userId: string): Promise<ConversationDocument[]>;
    createConversation(callerId: string, callerName: string, callerRole: string, dto: CreateConversationDto): Promise<ConversationDocument>;
    getConversation(userId: string, conversationId: string): Promise<ConversationDocument>;
    updateConversation(userId: string, conversationId: string, dto: UpdateConversationDto): Promise<ConversationDocument>;
    getMessages(userId: string, conversationId: string, pagination: PaginationQueryDto): Promise<{
        data: MessageDocument[];
        total: number;
    }>;
    sendMessage(senderId: string, senderName: string, conversationId: string, dto: SendMessageDto): Promise<MessageDocument>;
    markRead(userId: string, conversationId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
    private assertParticipant;
}
