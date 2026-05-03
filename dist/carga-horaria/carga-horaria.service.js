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
exports.CargaHorariaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const carga_horaria_schema_1 = require("./schemas/carga-horaria.schema");
let CargaHorariaService = class CargaHorariaService {
    constructor(model) {
        this.model = model;
    }
    async findByCursoLectivo(cursoLectivoId) {
        return this.model
            .find({ cursoLectivoId: new mongoose_2.Types.ObjectId(cursoLectivoId) })
            .populate('materiaId', 'nombre codigo')
            .populate('docenteId', 'name email')
            .sort({ createdAt: 1 })
            .exec();
    }
    async getDisponibles(cursoLectivoId, docenteId) {
        const cursoLectivo = await this.model.db
            .model('CursoLectivo')
            .findById(cursoLectivoId)
            .populate({
            path: 'cursoId',
            select: 'nivel especialidad paralelo jornada materias',
            populate: { path: 'materias', select: 'nombre codigo status' },
        })
            .exec();
        if (!cursoLectivo)
            throw new common_1.NotFoundException('Curso lectivo no encontrado');
        const curso = cursoLectivo.cursoId;
        if (!curso)
            throw new common_1.NotFoundException('El curso lectivo no tiene un curso base asociado');
        const todasMaterias = (curso.materias ?? []).filter((m) => m.status === 'active');
        const existentes = await this.model
            .find({ cursoLectivoId: new mongoose_2.Types.ObjectId(cursoLectivoId) })
            .select('materiaId docenteId')
            .lean()
            .exec();
        const docenteOid = new mongoose_2.Types.ObjectId(docenteId);
        const tomadasPorOtro = new Set(existentes
            .filter(a => !a.docenteId.equals(docenteOid))
            .map(a => a.materiaId.toString()));
        const asignadasAlDocente = existentes
            .filter(a => a.docenteId.equals(docenteOid))
            .map(a => a.materiaId.toString());
        const disponibles = todasMaterias.filter((m) => !tomadasPorOtro.has((m._id ?? m.id).toString()));
        return { disponibles, asignadasAlDocente };
    }
    async findByDocente(docenteId) {
        const asignaciones = await this.model
            .find({ docenteId: new mongoose_2.Types.ObjectId(docenteId) })
            .populate('materiaId', 'nombre codigo horas')
            .populate({
            path: 'cursoLectivoId',
            select: 'academicYear status',
            populate: { path: 'cursoId', select: 'nivel especialidad paralelo jornada subnivel' },
        })
            .sort({ createdAt: 1 })
            .lean()
            .exec();
        const grupos = new Map();
        for (const a of asignaciones) {
            const cl = a.cursoLectivoId;
            const clId = cl?._id?.toString() ?? 'sin-curso';
            if (!grupos.has(clId)) {
                grupos.set(clId, { cursoLectivo: cl, materias: [], totalHoras: 0 });
            }
            const grupo = grupos.get(clId);
            const materia = a.materiaId;
            grupo.materias.push(materia);
            grupo.totalHoras += materia?.horas ?? 0;
        }
        return Array.from(grupos.values());
    }
    async findMateriasByEstudiante(estudianteId) {
        const enrollment = await this.model.db
            .model('Enrollment')
            .findOne({
            $or: [
                { studentId: estudianteId },
                { studentId: new mongoose_2.Types.ObjectId(estudianteId) },
            ],
            status: 'enrolled',
        })
            .select('cursoLectivoId')
            .lean()
            .exec();
        if (!enrollment)
            return { cursoLectivo: null, materias: [] };
        const cursoLectivoId = enrollment.cursoLectivoId?.toString();
        const cursoLectivo = await this.model.db
            .model('CursoLectivo')
            .findById(cursoLectivoId)
            .populate({
            path: 'cursoId',
            select: 'nivel especialidad paralelo jornada subnivel materias',
            populate: { path: 'materias', select: 'nombre codigo horas status' },
        })
            .lean()
            .exec();
        if (!cursoLectivo)
            return { cursoLectivo: null, materias: [] };
        const curso = cursoLectivo.cursoId;
        const todasMaterias = (curso?.materias ?? []).filter((m) => m.status !== 'inactive');
        const asignaciones = await this.model
            .find({
            $or: [
                { cursoLectivoId: cursoLectivoId },
                { cursoLectivoId: new mongoose_2.Types.ObjectId(cursoLectivoId) },
            ],
        })
            .select('materiaId docenteId')
            .populate('docenteId', 'name email')
            .lean()
            .exec();
        const docenteMap = new Map();
        for (const a of asignaciones) {
            docenteMap.set(a.materiaId.toString(), a.docenteId);
        }
        const materias = todasMaterias.map((m) => ({
            materia: m,
            docente: docenteMap.get((m._id ?? m.id).toString()) ?? null,
        }));
        const cursoLectivoResponse = {
            _id: cursoLectivo._id,
            academicYear: cursoLectivo.academicYear,
            status: cursoLectivo.status,
            cursoId: curso
                ? {
                    nivel: curso.nivel,
                    especialidad: curso.especialidad,
                    paralelo: curso.paralelo,
                    jornada: curso.jornada,
                    subnivel: curso.subnivel,
                }
                : null,
        };
        return { cursoLectivo: cursoLectivoResponse, materias };
    }
    async setAsignacion(cursoLectivoId, docenteId, dto) {
        const clOid = new mongoose_2.Types.ObjectId(cursoLectivoId);
        const dOid = new mongoose_2.Types.ObjectId(docenteId);
        const mOids = dto.materiaIds.map(id => new mongoose_2.Types.ObjectId(id));
        if (mOids.length > 0) {
            const conflictos = await this.model.find({
                cursoLectivoId: clOid,
                materiaId: { $in: mOids },
                docenteId: { $ne: dOid },
            }).populate('materiaId', 'nombre').lean();
            if (conflictos.length > 0) {
                const nombres = conflictos.map((c) => c.materiaId?.nombre ?? c.materiaId).join(', ');
                throw new common_1.ConflictException(`Las siguientes materias ya tienen docente asignado: ${nombres}`);
            }
        }
        await this.model.deleteMany({ cursoLectivoId: clOid, docenteId: dOid });
        if (mOids.length > 0) {
            const docs = mOids.map(mOid => ({
                cursoLectivoId: clOid,
                materiaId: mOid,
                docenteId: dOid,
            }));
            await this.model.insertMany(docs);
        }
        return this.findByCursoLectivo(cursoLectivoId);
    }
};
exports.CargaHorariaService = CargaHorariaService;
exports.CargaHorariaService = CargaHorariaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(carga_horaria_schema_1.CargaHoraria.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CargaHorariaService);
//# sourceMappingURL=carga-horaria.service.js.map