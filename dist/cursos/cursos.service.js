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
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const curso_schema_1 = require("./schemas/curso.schema");
let CursosService = class CursosService {
    constructor(cursoModel) {
        this.cursoModel = cursoModel;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'nivel', sortOrder = 'asc', jornada, status } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { nivel: { $regex: search, $options: 'i' } },
                { especialidad: { $regex: search, $options: 'i' } },
                { paralelo: { $regex: search, $options: 'i' } },
            ];
        }
        if (jornada)
            filter.jornada = jornada;
        if (status)
            filter.status = status;
        const [data, total] = await Promise.all([
            this.cursoModel
                .find(filter)
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.cursoModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const curso = await this.cursoModel.findById(id);
        if (!curso)
            throw new common_1.NotFoundException('Curso no encontrado');
        return curso;
    }
    async create(dto) {
        try {
            return await new this.cursoModel(dto).save();
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe un curso con ese nivel, especialidad, paralelo y jornada');
            }
            throw err;
        }
    }
    async update(id, dto) {
        try {
            const updated = await this.cursoModel.findByIdAndUpdate(id, dto, { new: true });
            if (!updated)
                throw new common_1.NotFoundException('Curso no encontrado');
            return updated;
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe un curso con ese nivel, especialidad, paralelo y jornada');
            }
            throw err;
        }
    }
    async remove(id) {
        const result = await this.cursoModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Curso no encontrado');
    }
    async getMaterias(id) {
        const curso = await this.cursoModel
            .findById(id)
            .populate('materias')
            .exec();
        if (!curso)
            throw new common_1.NotFoundException('Curso no encontrado');
        return curso.materias;
    }
    async setMaterias(id, materiaIds) {
        const objectIds = materiaIds.map((mid) => new mongoose_2.Types.ObjectId(mid));
        const updated = await this.cursoModel.findByIdAndUpdate(id, { materias: objectIds }, { new: true }).populate('materias').exec();
        if (!updated)
            throw new common_1.NotFoundException('Curso no encontrado');
        return updated.materias;
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(curso_schema_1.Curso.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CursosService);
//# sourceMappingURL=cursos.service.js.map