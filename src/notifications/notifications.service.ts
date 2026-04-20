import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './schemas/notification.schema';
import { NotificationsGateway } from './notifications.gateway';
import { BroadcastNotificationDto } from './dto/broadcast-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel('Student') private readonly studentModel: Model<any>,
    @InjectModel('User') private readonly userModel: Model<any>,
    private readonly gateway: NotificationsGateway,
  ) {}

  async create(
    recipientUserId: string,
    type: NotificationType,
    title: string,
    body: string,
    link?: string,
  ): Promise<NotificationDocument> {
    const notification = await new this.notificationModel({
      recipient: new Types.ObjectId(recipientUserId),
      type,
      title,
      body,
      link,
    }).save();

    this.gateway.sendToUser(recipientUserId, notification);
    return notification;
  }

  async createForStudentId(
    studentId: string,
    type: NotificationType,
    title: string,
    body: string,
    link?: string,
  ): Promise<void> {
    const student = await this.studentModel.findById(studentId).select('userId').exec();
    if (!student?.userId) return;
    await this.create(student.userId.toString(), type, title, body, link);
  }

  async broadcast(dto: BroadcastNotificationDto): Promise<void> {
    const filter = dto.roles?.length ? { role: { $in: dto.roles } } : {};
    const users = await this.userModel.find(filter).select('_id').exec();

    await Promise.all(
      users.map((u) =>
        this.create(u._id.toString(), 'system', dto.title, dto.body, dto.link),
      ),
    );
  }

  async findForUser(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: NotificationDocument[]; total: number; unread: number }> {
    const recipientId = new Types.ObjectId(userId);
    const skip = (page - 1) * limit;

    const [data, total, unread] = await Promise.all([
      this.notificationModel
        .find({ recipient: recipientId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.notificationModel.countDocuments({ recipient: recipientId }),
      this.notificationModel.countDocuments({ recipient: recipientId, read: false }),
    ]);

    return { data, total, unread };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({
      recipient: new Types.ObjectId(userId),
      read: false,
    });
  }

  async markRead(userId: string, notificationId: string): Promise<void> {
    await this.notificationModel.findOneAndUpdate(
      { _id: new Types.ObjectId(notificationId), recipient: new Types.ObjectId(userId) },
      { read: true },
    );
  }

  async markAllRead(userId: string): Promise<void> {
    await this.notificationModel.updateMany(
      { recipient: new Types.ObjectId(userId), read: false },
      { read: true },
    );
  }

  async deleteOne(userId: string, notificationId: string): Promise<void> {
    await this.notificationModel.findOneAndDelete({
      _id: new Types.ObjectId(notificationId),
      recipient: new Types.ObjectId(userId),
    });
  }
}
