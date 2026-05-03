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
exports.DeceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dece_expediente_schema_1 = require("./schemas/dece-expediente.schema");
const dece_registro_schema_1 = require("./schemas/dece-registro.schema");
const students_service_1 = require("../students/students.service");
const notifications_service_1 = require("../notifications/notifications.service");
let DeceService = class DeceService {
    constructor(expedienteModel, registroModel, studentsService, notificationsService) {
        this.expedienteModel = expedienteModel;
        this.registroModel = registroModel;
        this.studentsService = studentsService;
        this.notificationsService = notificationsService;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const pipeline = [
            {
                $lookup: {
                    from: 'students',
                    localField: 'studentId',
                    foreignField: '_id',
                    as: 'student',
                },
            },
            { $unwind: '$student' },
            ...(search
                ? [{
                        $match: {
                            $or: [
                                { 'student.name': { $regex: search, $options: 'i' } },
                                { 'student.dni': { $regex: search, $options: 'i' } },
                                { 'student.email': { $regex: search, $options: 'i' } },
                            ],
                        },
                    }]
                : []),
            {
                $lookup: {
                    from: 'deceregistros',
                    localField: '_id',
                    foreignField: 'expedienteId',
                    as: 'registros',
                },
            },
            {
                $addFields: {
                    totalRegistros: { $size: '$registros' },
                    ultimoRegistro: { $max: '$registros.fecha' },
                },
            },
            { $project: { registros: 0 } },
            { $sort: { [sortBy === 'createdAt' ? 'createdAt' : sortBy]: sortOrder === 'asc' ? 1 : -1 } },
        ];
        const [countResult, data] = await Promise.all([
            this.expedienteModel.aggregate([...pipeline, { $count: 'total' }]),
            this.expedienteModel.aggregate([...pipeline, { $skip: (page - 1) * limit }, { $limit: limit }]),
        ]);
        const total = countResult[0]?.total ?? 0;
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findByStudent(studentId) {
        return this.expedienteModel
            .findOne({ studentId: new mongoose_2.Types.ObjectId(studentId) })
            .populate('studentId', 'name email dni gender mobile img')
            .exec();
    }
    async findByUserIdWithRegistros(userId) {
        let student;
        try {
            student = await this.studentsService.findByUserId(userId);
        }
        catch {
            return { expediente: null, registros: [] };
        }
        const expediente = await this.findByStudent(student._id.toString());
        if (!expediente)
            return { expediente: null, registros: [] };
        const registros = await this.registroModel
            .find({ expedienteId: expediente._id })
            .sort({ fecha: -1 })
            .exec();
        return { expediente, registros };
    }
    async findOne(id) {
        const exp = await this.expedienteModel
            .findById(id)
            .populate('studentId', 'name email dni gender mobile img')
            .exec();
        if (!exp)
            throw new common_1.NotFoundException('Expediente DECE no encontrado');
        return exp;
    }
    async create(dto) {
        try {
            const saved = await new this.expedienteModel({
                studentId: new mongoose_2.Types.ObjectId(dto.studentId),
                notas: dto.notas,
            }).save();
            this.notificationsService
                .createForStudentId(dto.studentId, 'dece', 'Atención DECE registrada', 'Se ha registrado una atención psicológica DECE en tu perfil.', '/student/mi-dece')
                .catch(() => { });
            return saved;
        }
        catch (err) {
            if (err.code === 11000)
                throw new common_1.ConflictException('Este estudiante ya tiene un expediente DECE');
            throw err;
        }
    }
    async getOrCreate(studentId) {
        const existing = await this.expedienteModel.findOne({
            studentId: new mongoose_2.Types.ObjectId(studentId),
        });
        if (existing)
            return existing;
        return this.create({ studentId });
    }
    async remove(id) {
        const count = await this.registroModel.countDocuments({
            expedienteId: new mongoose_2.Types.ObjectId(id),
        });
        if (count > 0) {
            throw new Error('No se puede eliminar un expediente DECE que tiene registros');
        }
        const result = await this.expedienteModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Expediente DECE no encontrado');
    }
    async getRegistros(expedienteId) {
        await this.findOne(expedienteId);
        return this.registroModel
            .find({ expedienteId: new mongoose_2.Types.ObjectId(expedienteId) })
            .sort({ fecha: -1 })
            .exec();
    }
    async addRegistro(expedienteId, dto, evidencias = []) {
        await this.findOne(expedienteId);
        return new this.registroModel({
            expedienteId: new mongoose_2.Types.ObjectId(expedienteId),
            tipo: dto.tipo,
            fecha: new Date(dto.fecha),
            descripcion: dto.descripcion,
            evidencias: [...(dto.evidencias ?? []), ...evidencias],
            creadoPor: dto.creadoPor,
        }).save();
    }
    async updateRegistro(expedienteId, registroId, dto, newEvidencias = []) {
        const update = {
            ...dto,
            ...(dto.fecha ? { fecha: new Date(dto.fecha) } : {}),
        };
        delete update.evidencias;
        const ops = { $set: update };
        if (newEvidencias.length > 0) {
            ops.$push = { evidencias: { $each: newEvidencias } };
        }
        const registro = await this.registroModel.findOneAndUpdate({ _id: registroId, expedienteId: new mongoose_2.Types.ObjectId(expedienteId) }, ops, { new: true });
        if (!registro)
            throw new common_1.NotFoundException('Registro DECE no encontrado');
        return registro;
    }
    async deleteRegistro(expedienteId, registroId) {
        const result = await this.registroModel.findOneAndDelete({
            _id: registroId,
            expedienteId: new mongoose_2.Types.ObjectId(expedienteId),
        });
        if (!result)
            throw new common_1.NotFoundException('Registro DECE no encontrado');
    }
    async deleteEvidencia(expedienteId, registroId, url) {
        const registro = await this.registroModel.findOneAndUpdate({ _id: registroId, expedienteId: new mongoose_2.Types.ObjectId(expedienteId) }, { $pull: { evidencias: url } }, { new: true });
        if (!registro)
            throw new common_1.NotFoundException('Registro DECE no encontrado');
        return registro;
    }
    async getReporte(filters) {
        const match = {};
        if (filters.tipo)
            match.tipo = filters.tipo;
        if (filters.creadoPor)
            match.creadoPor = { $regex: filters.creadoPor, $options: 'i' };
        if (filters.fechaDesde || filters.fechaHasta) {
            match.fecha = {};
            if (filters.fechaDesde)
                match.fecha.$gte = new Date(filters.fechaDesde);
            if (filters.fechaHasta)
                match.fecha.$lte = new Date(filters.fechaHasta);
        }
        const pipeline = [
            { $match: match },
            {
                $lookup: {
                    from: 'deceexpedientes',
                    localField: 'expedienteId',
                    foreignField: '_id',
                    as: 'expediente',
                },
            },
            { $unwind: '$expediente' },
            {
                $lookup: {
                    from: 'students',
                    localField: 'expediente.studentId',
                    foreignField: '_id',
                    as: 'student',
                },
            },
            { $unwind: '$student' },
        ];
        if (filters.studentId) {
            pipeline.push({
                $match: { 'expediente.studentId': new mongoose_2.Types.ObjectId(filters.studentId) },
            });
        }
        pipeline.push({
            $project: {
                tipo: 1, fecha: 1, descripcion: 1, creadoPor: 1, evidencias: 1, createdAt: 1,
                expedienteId: 1,
                studentName: '$student.name',
                studentDni: '$student.dni',
                studentMobile: '$student.mobile',
                studentAddress: '$student.address',
                parentGuardianName: '$student.parentGuardianName',
                parentGuardianMobile: '$student.parentGuardianMobile',
            },
        }, { $sort: { fecha: -1 } });
        return this.registroModel.aggregate(pipeline);
    }
};
exports.DeceService = DeceService;
exports.DeceService = DeceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dece_expediente_schema_1.DeceExpediente.name)),
    __param(1, (0, mongoose_1.InjectModel)(dece_registro_schema_1.DeceRegistro.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        students_service_1.StudentsService,
        notifications_service_1.NotificationsService])
], DeceService);
//# sourceMappingURL=dece.service.js.map