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
exports.ExpedienteAcademicoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const expediente_academico_schema_1 = require("./schemas/expediente-academico.schema");
const expediente_academico_documento_schema_1 = require("./schemas/expediente-academico-documento.schema");
const students_service_1 = require("../students/students.service");
const parents_service_1 = require("../parents/parents.service");
const student_schema_1 = require("../students/schemas/student.schema");
let ExpedienteAcademicoService = class ExpedienteAcademicoService {
    constructor(expedienteModel, documentoModel, studentModel, studentsService, parentsService) {
        this.expedienteModel = expedienteModel;
        this.documentoModel = documentoModel;
        this.studentModel = studentModel;
        this.studentsService = studentsService;
        this.parentsService = parentsService;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
        const matchStage = search
            ? [{
                    $match: {
                        $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { dni: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } },
                        ],
                    },
                }]
            : [];
        const pipeline = [
            ...matchStage,
            {
                $lookup: {
                    from: 'expedienteacademicos',
                    localField: '_id',
                    foreignField: 'studentId',
                    as: 'expediente',
                },
            },
            {
                $addFields: {
                    expediente: { $arrayElemAt: ['$expediente', 0] },
                },
            },
            {
                $lookup: {
                    from: 'expedienteacademicodocumentos',
                    localField: 'expediente._id',
                    foreignField: 'expedienteId',
                    as: 'docs',
                },
            },
            {
                $addFields: {
                    totalDocumentos: { $size: '$docs' },
                    ultimaActividad: { $max: '$docs.createdAt' },
                    expedienteId: '$expediente._id',
                },
            },
            { $project: { docs: 0, expediente: 0, password: 0 } },
            { $sort: { name: 1 } },
        ];
        const [countResult, data] = await Promise.all([
            this.studentModel.aggregate([...pipeline, { $count: 'total' }]),
            this.studentModel.aggregate([
                ...pipeline,
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ]),
        ]);
        const total = countResult[0]?.total ?? 0;
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async getOrCreate(studentId) {
        const existing = await this.expedienteModel.findOne({
            studentId: new mongoose_2.Types.ObjectId(studentId),
        });
        if (existing)
            return existing;
        try {
            return await new this.expedienteModel({
                studentId: new mongoose_2.Types.ObjectId(studentId),
            }).save();
        }
        catch (err) {
            if (err.code === 11000) {
                return this.expedienteModel.findOne({
                    studentId: new mongoose_2.Types.ObjectId(studentId),
                });
            }
            throw err;
        }
    }
    async findByStudent(studentId) {
        const expediente = await this.expedienteModel
            .findOne({ studentId: new mongoose_2.Types.ObjectId(studentId) })
            .populate('studentId', 'name email dni gender mobile img')
            .exec();
        if (!expediente)
            return { expediente: null, documentos: [] };
        const documentos = await this.documentoModel
            .find({ expedienteId: expediente._id })
            .sort({ seccion: 1, createdAt: 1 })
            .exec();
        return { expediente, documentos };
    }
    async findMyExpediente(userId) {
        let student;
        try {
            student = await this.studentsService.findByUserId(userId);
        }
        catch {
            return { expediente: null, documentos: [] };
        }
        return this.findByStudent(student._id.toString());
    }
    async findHijoExpediente(parentUserId, studentId) {
        const parent = await this.parentsService.findByUserId(parentUserId);
        const parentId = parent._id.toString();
        const inStudentIds = parent.studentIds.some((s) => {
            const id = s?._id ?? s;
            return id?.toString() === studentId;
        });
        if (!inStudentIds) {
            const student = await this.studentsService.findOne(studentId).catch(() => null);
            const linked = student && [
                student.fatherId?.toString(),
                student.motherId?.toString(),
                student.guardianId?.toString(),
            ].filter(Boolean).includes(parentId);
            if (!linked)
                throw new common_1.ForbiddenException('No tenés acceso al expediente de este estudiante');
        }
        return this.findByStudent(studentId);
    }
    async getSeccionesGlobales() {
        const result = await this.documentoModel.distinct('seccion');
        return result.sort((a, b) => a.localeCompare(b));
    }
    async getSeccionesStats() {
        const result = await this.documentoModel.aggregate([
            { $group: { _id: '$seccion', count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]);
        return result.map((r) => ({ nombre: r._id, count: r.count }));
    }
    async deleteSeccionGlobal(seccionName) {
        const res = await this.documentoModel.deleteMany({ seccion: seccionName });
        return { deleted: res.deletedCount };
    }
    async getDocumentos(expedienteId) {
        const expediente = await this.expedienteModel.findById(expedienteId);
        if (!expediente)
            throw new common_1.NotFoundException('Expediente no encontrado');
        return this.documentoModel
            .find({ expedienteId: new mongoose_2.Types.ObjectId(expedienteId) })
            .sort({ seccion: 1, createdAt: 1 })
            .exec();
    }
    async addDocumento(expedienteId, dto) {
        const expediente = await this.expedienteModel.findById(expedienteId);
        if (!expediente)
            throw new common_1.NotFoundException('Expediente no encontrado');
        return new this.documentoModel({
            expedienteId: new mongoose_2.Types.ObjectId(expedienteId),
            seccion: dto.seccion,
            nombre: dto.nombre,
            url: dto.url,
            descripcion: dto.descripcion,
            creadoPor: dto.creadoPor,
            fecha: dto.fecha ? new Date(dto.fecha) : new Date(),
        }).save();
    }
    async updateDocumento(expedienteId, docId, dto) {
        const update = { ...dto };
        if (dto.fecha)
            update.fecha = new Date(dto.fecha);
        const doc = await this.documentoModel.findOneAndUpdate({ _id: docId, expedienteId: new mongoose_2.Types.ObjectId(expedienteId) }, { $set: update }, { new: true });
        if (!doc)
            throw new common_1.NotFoundException('Documento no encontrado');
        return doc;
    }
    async deleteDocumento(expedienteId, docId) {
        const result = await this.documentoModel.findOneAndDelete({
            _id: docId,
            expedienteId: new mongoose_2.Types.ObjectId(expedienteId),
        });
        if (!result)
            throw new common_1.NotFoundException('Documento no encontrado');
    }
    async deleteSeccion(expedienteId, seccionName) {
        const expediente = await this.expedienteModel.findById(expedienteId);
        if (!expediente)
            throw new common_1.NotFoundException('Expediente no encontrado');
        await this.documentoModel.deleteMany({
            expedienteId: new mongoose_2.Types.ObjectId(expedienteId),
            seccion: seccionName,
        });
    }
    async deleteExpediente(id) {
        const expediente = await this.expedienteModel.findByIdAndDelete(id);
        if (!expediente)
            throw new common_1.NotFoundException('Expediente no encontrado');
        await this.documentoModel.deleteMany({ expedienteId: new mongoose_2.Types.ObjectId(id) });
    }
};
exports.ExpedienteAcademicoService = ExpedienteAcademicoService;
exports.ExpedienteAcademicoService = ExpedienteAcademicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(expediente_academico_schema_1.ExpedienteAcademico.name)),
    __param(1, (0, mongoose_1.InjectModel)(expediente_academico_documento_schema_1.ExpedienteAcademicoDocumento.name)),
    __param(2, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        students_service_1.StudentsService,
        parents_service_1.ParentsService])
], ExpedienteAcademicoService);
//# sourceMappingURL=expediente-academico.service.js.map