import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { UsersService } from '../users/users.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class MessagingController {
    private readonly messagingService;
    private readonly messagingGateway;
    private readonly usersService;
    constructor(messagingService: MessagingService, messagingGateway: MessagingGateway, usersService: UsersService);
    getConversations(user: any): Promise<import("./schemas/conversation.schema").ConversationDocument[]>;
    createConversation(user: any, dto: CreateConversationDto): Promise<import("./schemas/conversation.schema").ConversationDocument>;
    getConversation(user: any, id: any): Promise<import("./schemas/conversation.schema").ConversationDocument>;
    updateConversation(user: any, id: any, dto: UpdateConversationDto): Promise<import("./schemas/conversation.schema").ConversationDocument>;
    getMessages(user: any, id: any, pagination: PaginationQueryDto): Promise<{
        data: import("./schemas/message.schema").MessageDocument[];
        total: number;
    }>;
    sendMessage(user: any, id: any, dto: SendMessageDto): Promise<import("./schemas/message.schema").MessageDocument>;
    markRead(user: any, id: any): Promise<void>;
    getUnreadCount(user: any): Promise<number>;
    getUsers(): Promise<import("../users/schemas/user.schema").UserDocument[]>;
}
