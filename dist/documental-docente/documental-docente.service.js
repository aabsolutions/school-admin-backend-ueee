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
exports.DocumentalDocenteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const documental_docente_schema_1 = require("./schemas/documental-docente.schema");
let DocumentalDocenteService = class DocumentalDocenteService {
    constructor(model) {
        this.model = model;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
        const pipeline = [
            {
                $lookup: {
                    from: 'teachers',
                    localField: 'teacherId',
                    foreignField: '_id',
                    as: 'teacher',
                },
            },
            { $unwind: '$teacher' },
            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                { 'teacher.name': { $regex: search, $options: 'i' } },
                                { 'teacher.dni': { $regex: search, $options: 'i' } },
                                { 'teacher.email': { $regex: search, $options: 'i' } },
                            ],
                        },
                    },
                ]
                : []),
            {
                $addFields: {
                    totalProfesionales: {
                        $size: {
                            $filter: {
                                input: '$documentos',
                                as: 'd',
                                cond: { $eq: ['$$d.categoria', 'profesional'] },
                            },
                        },
                    },
                    totalPlanificaciones: {
                        $size: {
                            $filter: {
                                input: '$documentos',
                                as: 'd',
                                cond: { $eq: ['$$d.categoria', 'planificacion'] },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    teacherId: 1,
                    totalProfesionales: 1,
                    totalPlanificaciones: 1,
                    createdAt: 1,
                    'teacher.name': 1,
                    'teacher.dni': 1,
                    'teacher.email': 1,
                    'teacher.img': 1,
                },
            },
            { $sort: { 'teacher.name': 1 } },
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
    async findByTeacher(teacherId) {
        const record = await this.model
            .findOne({ teacherId: new mongoose_2.Types.ObjectId(teacherId) })
            .populate('teacherId', 'name email dni gender mobile img')
            .exec();
        if (!record)
            throw new common_1.NotFoundException('Expediente documental no encontrado');
        return record;
    }
    async getOrCreate(teacherId) {
        let record = await this.model.findOne({
            teacherId: new mongoose_2.Types.ObjectId(teacherId),
        });
        if (!record) {
            record = await new this.model({
                teacherId: new mongoose_2.Types.ObjectId(teacherId),
            }).save();
        }
        await record.populate('teacherId', 'name email dni gender mobile img');
        return record;
    }
    async addDocumento(teacherId, nombre, categoria, url, descripcion) {
        const record = await this.getOrCreate(teacherId);
        const nuevoDoc = { nombre, url, categoria, fecha: new Date() };
        if (descripcion)
            nuevoDoc.descripcion = descripcion;
        const updated = await this.model.findByIdAndUpdate(record._id, { $push: { documentos: nuevoDoc } }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Registro no encontrado');
        return updated;
    }
    async deleteDocumento(teacherId, docId) {
        const record = await this.model.findOne({
            teacherId: new mongoose_2.Types.ObjectId(teacherId),
        });
        if (!record)
            throw new common_1.NotFoundException('Expediente documental no encontrado');
        const doc = record.documentos.find((d) => d._id.toString() === docId);
        if (!doc)
            throw new common_1.NotFoundException('Documento no encontrado');
        const updated = await this.model.findByIdAndUpdate(record._id, { $pull: { documentos: { _id: new mongoose_2.Types.ObjectId(docId) } } }, { new: true });
        return { url: doc.url, record: updated };
    }
};
exports.DocumentalDocenteService = DocumentalDocenteService;
exports.DocumentalDocenteService = DocumentalDocenteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(documental_docente_schema_1.DocumentalDocente.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DocumentalDocenteService);
//# sourceMappingURL=documental-docente.service.js.map