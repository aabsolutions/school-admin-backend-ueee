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
exports.CommunicadosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const communicado_schema_1 = require("./schemas/communicado.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const notifications_service_1 = require("../notifications/notifications.service");
let CommunicadosService = class CommunicadosService {
    constructor(communicadoModel, parentModel, studentModel, userModel, notificationsService) {
        this.communicadoModel = communicadoModel;
        this.parentModel = parentModel;
        this.studentModel = studentModel;
        this.userModel = userModel;
        this.notificationsService = notificationsService;
    }
    async create(teacherUserId, dto) {
        const [teacher, student, parent] = await Promise.all([
            this.userModel.findById(teacherUserId).select('name').lean(),
            this.studentModel.findById(dto.studentId).select('name').lean(),
            this.parentModel.findById(dto.parentId).select('name userId').lean(),
        ]);
        if (!teacher)
            throw new common_1.NotFoundException('Docente no encontrado');
        if (!student)
            throw new common_1.NotFoundException('Estudiante no encontrado');
        if (!parent)
            throw new common_1.NotFoundException('Padre no encontrado');
        const communicado = await new this.communicadoModel({
            teacherUserId: new mongoose_2.Types.ObjectId(teacherUserId),
            teacherName: teacher.name,
            studentId: new mongoose_2.Types.ObjectId(dto.studentId),
            studentName: student.name,
            parentId: new mongoose_2.Types.ObjectId(dto.parentId),
            parentUserId: parent.userId,
            subject: dto.subject,
            body: dto.body,
        }).save();
        await this.notificationsService.create(parent.userId.toString(), 'communicado', `Nuevo comunicado: ${dto.subject}`, `${teacher.name} le envió un comunicado sobre ${student.name}`);
        return communicado;
    }
    async findByTeacher(teacherUserId, query) {
        const { page = 1, limit = 10, search } = query;
        const filter = { teacherUserId: new mongoose_2.Types.ObjectId(teacherUserId) };
        if (search) {
            filter.$or = [
                { subject: { $regex: search, $options: 'i' } },
                { studentName: { $regex: search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.communicadoModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            this.communicadoModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findByParent(parentUserId, query) {
        const { page = 1, limit = 10 } = query;
        const filter = { parentUserId: new mongoose_2.Types.ObjectId(parentUserId) };
        const [data, total] = await Promise.all([
            this.communicadoModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            this.communicadoModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id, requestingUserId) {
        const communicado = await this.communicadoModel.findById(id);
        if (!communicado)
            throw new common_1.NotFoundException('Comunicado no encontrado');
        const isTeacher = communicado.teacherUserId.toString() === requestingUserId;
        const isParent = communicado.parentUserId.toString() === requestingUserId;
        if (!isTeacher && !isParent) {
            throw new common_1.ForbiddenException('No tenés acceso a este comunicado');
        }
        return communicado;
    }
    async createFromAbsence(studentId, date, takenByUserId) {
        const [student, user] = await Promise.all([
            this.studentModel.findById(studentId).select('name parentIds').lean(),
            this.userModel.findById(takenByUserId).select('name').lean(),
        ]);
        if (!student || !user)
            return;
        const parents = await this.parentModel
            .find({ _id: { $in: student.parentIds ?? [] } })
            .select('name userId')
            .lean();
        if (!parents.length)
            return;
        const dateStr = date.toLocaleDateString('es-EC', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        await Promise.all(parents.map((parent) => new this.communicadoModel({
            teacherUserId: new mongoose_2.Types.ObjectId(takenByUserId),
            teacherName: user.name,
            studentId: new mongoose_2.Types.ObjectId(studentId),
            studentName: student.name,
            parentId: parent._id,
            parentUserId: parent.userId,
            subject: `Ausencia de ${student.name} — ${dateStr}`,
            body: `Se comunica que ${student.name} estuvo ausente el día ${dateStr}.`,
        }).save()));
    }
    async markReceived(id, parentUserId) {
        const communicado = await this.communicadoModel.findById(id);
        if (!communicado)
            throw new common_1.NotFoundException('Comunicado no encontrado');
        if (communicado.parentUserId.toString() !== parentUserId) {
            throw new common_1.ForbiddenException('No podés marcar este comunicado como recibido');
        }
        if (communicado.status === 'received')
            return communicado;
        communicado.status = 'received';
        communicado.receivedAt = new Date();
        await communicado.save();
        await this.notificationsService.create(communicado.teacherUserId.toString(), 'communicado', 'Comunicado recibido', `${communicado.studentName}: "${communicado.subject}" fue confirmado como recibido`);
        return communicado;
    }
};
exports.CommunicadosService = CommunicadosService;
exports.CommunicadosService = CommunicadosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(communicado_schema_1.Communicado.name)),
    __param(1, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __param(2, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notifications_service_1.NotificationsService])
], CommunicadosService);
//# sourceMappingURL=communicados.service.js.map