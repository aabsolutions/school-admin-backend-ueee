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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./schemas/notification.schema");
const notifications_gateway_1 = require("./notifications.gateway");
let NotificationsService = class NotificationsService {
    constructor(notificationModel, studentModel, userModel, gateway) {
        this.notificationModel = notificationModel;
        this.studentModel = studentModel;
        this.userModel = userModel;
        this.gateway = gateway;
    }
    async create(recipientUserId, type, title, body, link) {
        const notification = await new this.notificationModel({
            recipient: new mongoose_2.Types.ObjectId(recipientUserId),
            type,
            title,
            body,
            link,
        }).save();
        this.gateway.sendToUser(recipientUserId, notification);
        return notification;
    }
    async createForStudentId(studentId, type, title, body, link) {
        const student = await this.studentModel.findById(studentId).select('userId').exec();
        if (!student?.userId)
            return;
        await this.create(student.userId.toString(), type, title, body, link);
    }
    async broadcast(dto) {
        const filter = dto.roles?.length ? { role: { $in: dto.roles } } : {};
        const users = await this.userModel.find(filter).select('_id').exec();
        await Promise.all(users.map((u) => this.create(u._id.toString(), 'system', dto.title, dto.body, dto.link)));
    }
    async findForUser(userId, page = 1, limit = 20) {
        const recipientId = new mongoose_2.Types.ObjectId(userId);
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
    async getUnreadCount(userId) {
        return this.notificationModel.countDocuments({
            recipient: new mongoose_2.Types.ObjectId(userId),
            read: false,
        });
    }
    async markRead(userId, notificationId) {
        await this.notificationModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(notificationId), recipient: new mongoose_2.Types.ObjectId(userId) }, { read: true });
    }
    async markAllRead(userId) {
        await this.notificationModel.updateMany({ recipient: new mongoose_2.Types.ObjectId(userId), read: false }, { read: true });
    }
    async deleteOne(userId, notificationId) {
        await this.notificationModel.findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(notificationId),
            recipient: new mongoose_2.Types.ObjectId(userId),
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map