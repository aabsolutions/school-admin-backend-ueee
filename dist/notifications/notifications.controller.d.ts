import { NotificationsService } from './notifications.service';
import { BroadcastNotificationDto } from './dto/broadcast-notification.dto';
declare class PaginationDto {
    page?: number;
    limit?: number;
}
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: any, pagination: PaginationDto): Promise<{
        data: import("./schemas/notification.schema").NotificationDocument[];
        total: number;
        unread: number;
    }>;
    getUnreadCount(user: any): Promise<number>;
    markAllRead(user: any): Promise<void>;
    markRead(user: any, id: any): Promise<void>;
    deleteOne(user: any, id: any): Promise<void>;
    broadcast(dto: BroadcastNotificationDto): Promise<void>;
}
export {};
