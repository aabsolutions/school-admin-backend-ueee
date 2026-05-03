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
var CursoLectivoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoLectivoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const curso_lectivo_schema_1 = require("./schemas/curso-lectivo.schema");
const teachers_service_1 = require("../teachers/teachers.service");
const enrollments_service_1 = require("../enrollments/enrollments.service");
let CursoLectivoService = CursoLectivoService_1 = class CursoLectivoService {
    constructor(cursoLectivoModel, teachersService, enrollmentsService) {
        this.cursoLectivoModel = cursoLectivoModel;
        this.teachersService = teachersService;
        this.enrollmentsService = enrollmentsService;
        this.logger = new common_1.Logger(CursoLectivoService_1.name);
    }
    async findAll(query) {
        const { page = 1, limit = 10, sortBy = 'academicYear', sortOrder = 'desc', academicYear, status, cursoId } = query;
        const filter = {};
        if (academicYear)
            filter.academicYear = academicYear;
        if (status)
            filter.status = status;
        if (cursoId)
            filter.cursoId = cursoId;
        const [data, total] = await Promise.all([
            this.cursoLectivoModel
                .find(filter)
                .populate('cursoId', 'nivel especialidad paralelo jornada')
                .populate('tutorId', 'name email')
                .populate('inspectorId', 'name email')
                .populate('psicologoId', 'name email')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.cursoLectivoModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const cl = await this.cursoLectivoModel
            .findById(id)
            .populate('cursoId', 'nivel especialidad paralelo jornada status')
            .populate('tutorId', 'name email mobile')
            .populate('inspectorId', 'name email mobile')
            .populate('psicologoId', 'name email mobile');
        if (!cl)
            throw new common_1.NotFoundException('Curso lectivo no encontrado');
        return cl;
    }
    async create(dto) {
        try {
            const saved = await new this.cursoLectivoModel(dto).save();
            return this.findOne(saved._id.toString());
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe un año lectivo para ese curso');
            }
            throw err;
        }
    }
    async update(id, dto) {
        try {
            const updated = await this.cursoLectivoModel.findByIdAndUpdate(id, dto, { new: true });
            if (!updated)
                throw new common_1.NotFoundException('Curso lectivo no encontrado');
            return this.findOne(id);
        }
        catch (err) {
            if (err.code === 11000) {
                throw new common_1.ConflictException('Ya existe un año lectivo para ese curso');
            }
            throw err;
        }
    }
    async remove(id) {
        const result = await this.cursoLectivoModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Curso lectivo no encontrado');
    }
    async findTutorAlumnos(userId) {
        let teacher;
        try {
            teacher = await this.teachersService.findByUserId(userId);
        }
        catch (err) {
            return { cursoLectivo: null, estudiantes: [] };
        }
        const teacherIdStr = teacher._id.toString();
        const cursoLectivo = await this.cursoLectivoModel
            .findOne({ $or: [{ tutorId: teacher._id }, { tutorId: teacherIdStr }] })
            .populate('cursoId', 'nivel especialidad paralelo jornada subnivel')
            .populate('tutorId', 'name email')
            .sort({ createdAt: -1 })
            .exec();
        if (!cursoLectivo)
            return { cursoLectivo: null, estudiantes: [] };
        const result = await this.enrollmentsService.findAll({
            cursoLectivoId: cursoLectivo._id.toString(),
            limit: 500,
            page: 1,
            sortBy: 'enrolledAt',
            sortOrder: 'asc',
            status: 'enrolled',
        });
        const estudiantes = result.data.map((e) => {
            const s = e.studentId ?? {};
            return {
                dni: s.dni ?? '',
                name: s.name ?? '',
                email: s.email ?? '',
                gender: s.gender ?? '',
                birthdate: s.birthdate ?? null,
                mobile: s.mobile ?? '',
            };
        });
        return { cursoLectivo, estudiantes };
    }
};
exports.CursoLectivoService = CursoLectivoService;
exports.CursoLectivoService = CursoLectivoService = CursoLectivoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(curso_lectivo_schema_1.CursoLectivo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        teachers_service_1.TeachersService,
        enrollments_service_1.EnrollmentsService])
], CursoLectivoService);
//# sourceMappingURL=curso-lectivo.service.js.map