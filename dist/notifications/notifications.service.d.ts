import { Model } from 'mongoose';
import { NotificationDocument, NotificationType } from './schemas/notification.schema';
import { NotificationsGateway } from './notifications.gateway';
import { BroadcastNotificationDto } from './dto/broadcast-notification.dto';
export declare class NotificationsService {
    private readonly notificationModel;
    private readonly studentModel;
    private readonly userModel;
    private readonly gateway;
    constructor(notificationModel: Model<NotificationDocument>, studentModel: Model<any>, userModel: Model<any>, gateway: NotificationsGateway);
    create(recipientUserId: string, type: NotificationType, title: string, body: string, link?: string): Promise<NotificationDocument>;
    createForStudentId(studentId: string, type: NotificationType, title: string, body: string, link?: string): Promise<void>;
    broadcast(dto: BroadcastNotificationDto): Promise<void>;
    findForUser(userId: string, page?: number, limit?: number): Promise<{
        data: NotificationDocument[];
        total: number;
        unread: number;
    }>;
    getUnreadCount(userId: string): Promise<number>;
    markRead(userId: string, notificationId: string): Promise<void>;
    markAllRead(userId: string): Promise<void>;
    deleteOne(userId: string, notificationId: string): Promise<void>;
}
