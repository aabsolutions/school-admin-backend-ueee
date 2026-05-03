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
exports.MateriasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const materia_schema_1 = require("./schemas/materia.schema");
let MateriasService = class MateriasService {
    constructor(materiaModel) {
        this.materiaModel = materiaModel;
    }
    async findAll(query) {
        const { page = 1, limit = 100, search, sortBy = 'nombre', sortOrder = 'asc', status } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { nombre: { $regex: search, $options: 'i' } },
                { codigo: { $regex: search, $options: 'i' } },
                { descripcion: { $regex: search, $options: 'i' } },
            ];
        }
        if (status)
            filter.status = status;
        const [data, total] = await Promise.all([
            this.materiaModel
                .find(filter)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.materiaModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const materia = await this.materiaModel.findById(id);
        if (!materia)
            throw new common_1.NotFoundException('Materia no encontrada');
        return materia;
    }
    async create(dto) {
        try {
            return await new this.materiaModel(dto).save();
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe una materia con ese nombre o código');
            }
            throw err;
        }
    }
    async update(id, dto) {
        try {
            const updated = await this.materiaModel.findByIdAndUpdate(id, dto, { new: true });
            if (!updated)
                throw new common_1.NotFoundException('Materia no encontrada');
            return updated;
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe una materia con ese nombre o código');
            }
            throw err;
        }
    }
    async remove(id) {
        const result = await this.materiaModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Materia no encontrada');
    }
};
exports.MateriasService = MateriasService;
exports.MateriasService = MateriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(materia_schema_1.Materia.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MateriasService);
//# sourceMappingURL=materias.service.js.map