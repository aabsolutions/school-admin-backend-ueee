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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enrollment_schema_1 = require("./schemas/enrollment.schema");
const notifications_service_1 = require("../notifications/notifications.service");
let EnrollmentsService = class EnrollmentsService {
    constructor(enrollmentModel, notificationsService) {
        this.enrollmentModel = enrollmentModel;
        this.notificationsService = notificationsService;
    }
    async findAll(query) {
        const { page = 1, limit = 10, sortBy = 'enrolledAt', sortOrder = 'desc', studentId, cursoLectivoId, status, } = query;
        const filter = {};
        if (studentId)
            filter.studentId = new mongoose_2.Types.ObjectId(studentId);
        if (cursoLectivoId) {
            const oid = new mongoose_2.Types.ObjectId(cursoLectivoId);
            filter.$or = [{ cursoLectivoId: oid }, { cursoLectivoId: cursoLectivoId }];
        }
        if (status)
            filter.status = status;
        const [data, total] = await Promise.all([
            this.enrollmentModel
                .find(filter)
                .populate('studentId', 'name email dni gender birthdate mobile')
                .populate({
                path: 'cursoLectivoId',
                populate: { path: 'cursoId', select: 'nivel especialidad paralelo jornada' },
            })
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.enrollmentModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const enrollment = await this.enrollmentModel
            .findById(id)
            .populate('studentId', 'name email dni gender birthdate mobile')
            .populate({
            path: 'cursoLectivoId',
            populate: [
                { path: 'cursoId', select: 'nivel especialidad paralelo jornada' },
                { path: 'tutorId', select: 'name email' },
                { path: 'inspectorId', select: 'name email' },
                { path: 'psicologoId', select: 'name email' },
            ],
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Matrícula no encontrada');
        return enrollment;
    }
    async create(dto) {
        try {
            const saved = await new this.enrollmentModel({
                ...dto,
                studentId: new mongoose_2.Types.ObjectId(dto.studentId),
                cursoLectivoId: new mongoose_2.Types.ObjectId(dto.cursoLectivoId),
            }).save();
            this.notificationsService
                .createForStudentId(dto.studentId, 'enrollment', 'Nueva matrícula registrada', 'Tu matrícula ha sido registrada en el sistema.', '/student/dashboard')
                .catch(() => { });
            return this.findOne(saved._id.toString());
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('El estudiante ya está matriculado en ese curso lectivo');
            }
            throw err;
        }
    }
    async update(id, dto) {
        const updated = await this.enrollmentModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Matrícula no encontrada');
        return this.findOne(id);
    }
    async withdraw(id) {
        const updated = await this.enrollmentModel.findByIdAndUpdate(id, { status: 'withdrawn' }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Matrícula no encontrada');
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.enrollmentModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Matrícula no encontrada');
    }
    async getStats() {
        const enrollments = await this.enrollmentModel
            .find({ status: 'enrolled' })
            .select('cursoLectivoId studentId')
            .populate('studentId', 'gender')
            .lean()
            .exec();
        const map = new Map();
        for (const e of enrollments) {
            const key = e.cursoLectivoId.toString();
            const gender = e.studentId?.gender ?? '';
            if (!map.has(key))
                map.set(key, { total: 0, male: 0, female: 0 });
            const stat = map.get(key);
            stat.total++;
            if (gender === 'Male')
                stat.male++;
            if (gender === 'Female')
                stat.female++;
        }
        return Array.from(map.entries()).map(([cursoLectivoId, s]) => ({ cursoLectivoId, ...s }));
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map