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
exports.DocumentalEstudianteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const documental_estudiante_schema_1 = require("./schemas/documental-estudiante.schema");
const enrollment_schema_1 = require("../enrollments/schemas/enrollment.schema");
let DocumentalEstudianteService = class DocumentalEstudianteService {
    constructor(model, enrollmentModel) {
        this.model = model;
        this.enrollmentModel = enrollmentModel;
    }
    async getNivelActual(studentId) {
        const pipeline = [
            {
                $match: {
                    studentId: new mongoose_2.Types.ObjectId(studentId),
                    status: 'enrolled',
                },
            },
            {
                $lookup: {
                    from: 'cursoslectivos',
                    localField: 'cursoLectivoId',
                    foreignField: '_id',
                    as: 'cursoLectivo',
                },
            },
            { $unwind: '$cursoLectivo' },
            { $match: { 'cursoLectivo.status': 'active' } },
            {
                $lookup: {
                    from: 'cursos',
                    localField: 'cursoLectivo.cursoId',
                    foreignField: '_id',
                    as: 'curso',
                },
            },
            { $unwind: '$curso' },
            { $project: { nivel: '$curso.nivel' } },
            { $limit: 1 },
        ];
        const result = await this.enrollmentModel.aggregate(pipeline);
        return result[0]?.nivel ?? null;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
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
                ? [
                    {
                        $match: {
                            $or: [
                                { 'student.name': { $regex: search, $options: 'i' } },
                                { 'student.dni': { $regex: search, $options: 'i' } },
                            ],
                        },
                    },
                ]
                : []),
            {
                $project: {
                    studentId: 1,
                    boleta2do: 1, boleta3ro: 1, boleta4to: 1,
                    boleta5to: 1, boleta6to: 1, boleta7mo: 1, boleta8vo: 1,
                    boleta9no: 1, boleta10mo: 1, boleta1roBach: 1, boleta2doBach: 1,
                    copiaCedulaEstudiante: 1, copiaCedulaRepresentante: 1,
                    certificadoParticipacion: 1,
                    notas: 1, createdAt: 1, updatedAt: 1,
                    'student.name': 1, 'student.dni': 1, 'student.email': 1, 'student.img': 1,
                },
            },
            { $sort: { 'student.name': 1 } },
        ];
        const countPipeline = [...pipeline, { $count: 'total' }];
        const dataPipeline = [
            ...pipeline,
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ];
        const [countResult, data] = await Promise.all([
            this.model.aggregate(countPipeline),
            this.model.aggregate(dataPipeline),
        ]);
        const total = countResult[0]?.total ?? 0;
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findByStudent(studentId) {
        const record = await this.model
            .findOne({ studentId: new mongoose_2.Types.ObjectId(studentId) })
            .populate('studentId', 'name email dni gender mobile img')
            .exec();
        if (!record)
            throw new common_1.NotFoundException('Expediente documental no encontrado');
        const nivelActual = await this.getNivelActual(studentId);
        return { ...record.toObject(), nivelActual };
    }
    async getOrCreate(studentId) {
        let record = await this.model.findOne({
            studentId: new mongoose_2.Types.ObjectId(studentId),
        });
        if (!record) {
            record = await new this.model({
                studentId: new mongoose_2.Types.ObjectId(studentId),
            }).save();
        }
        await record.populate('studentId', 'name email dni gender mobile img');
        const nivelActual = await this.getNivelActual(studentId);
        return { ...record.toObject(), nivelActual };
    }
    async update(id, dto) {
        const record = await this.model.findByIdAndUpdate(id, { $set: dto }, { new: true });
        if (!record)
            throw new common_1.NotFoundException('Expediente documental no encontrado');
        const nivelActual = await this.getNivelActual(record.studentId.toString());
        return { ...record.toObject(), nivelActual };
    }
};
exports.DocumentalEstudianteService = DocumentalEstudianteService;
exports.DocumentalEstudianteService = DocumentalEstudianteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(documental_estudiante_schema_1.DocumentalEstudiante.name)),
    __param(1, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DocumentalEstudianteService);
//# sourceMappingURL=documental-estudiante.service.js.map