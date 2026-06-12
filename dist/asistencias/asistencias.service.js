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
exports.AsistenciasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_assignment_schema_1 = require("./schemas/attendance-assignment.schema");
const attendance_record_schema_1 = require("./schemas/attendance-record.schema");
const curso_lectivo_schema_1 = require("../curso-lectivo/schemas/curso-lectivo.schema");
const enrollment_schema_1 = require("../enrollments/schemas/enrollment.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const communicados_service_1 = require("../communicados/communicados.service");
let AsistenciasService = class AsistenciasService {
    constructor(assignmentModel, recordModel, cursoLectivoModel, enrollmentModel, parentModel, studentModel, communicadosService) {
        this.assignmentModel = assignmentModel;
        this.recordModel = recordModel;
        this.cursoLectivoModel = cursoLectivoModel;
        this.enrollmentModel = enrollmentModel;
        this.parentModel = parentModel;
        this.studentModel = studentModel;
        this.communicadosService = communicadosService;
    }
    async createAssignment(dto) {
        const cursoLectivo = await this.cursoLectivoModel
            .findById(dto.cursoLectivoId)
            .lean();
        if (!cursoLectivo)
            throw new common_1.NotFoundException('CursoLectivo no encontrado');
        const existing = await this.assignmentModel
            .findOne({ cursoLectivoId: new mongoose_2.Types.ObjectId(dto.cursoLectivoId) })
            .lean();
        if (existing && existing.userId.toString() !== dto.userId) {
            throw new common_1.ConflictException('Este curso ya tiene un registrador asignado');
        }
        return this.assignmentModel
            .findOneAndUpdate({ cursoLectivoId: new mongoose_2.Types.ObjectId(dto.cursoLectivoId) }, {
            userId: new mongoose_2.Types.ObjectId(dto.userId),
            cursoId: cursoLectivo.cursoId,
            isActive: true,
        }, { upsert: true, new: true })
            .populate('userId', 'name username role')
            .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
            .lean();
    }
    async findAllAssignments(query) {
        const { page = 1, limit = 10 } = query;
        const [data, total] = await Promise.all([
            this.assignmentModel
                .find()
                .populate('userId', 'name username role')
                .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            this.assignmentModel.countDocuments(),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async deleteAssignment(id) {
        const result = await this.assignmentModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Asignación no encontrada');
    }
    async getMyAssignment(userId) {
        const assignment = await this.assignmentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId), isActive: true })
            .populate('userId', 'name username role')
            .populate({ path: 'cursoLectivoId', populate: { path: 'cursoId' } })
            .sort({ createdAt: -1 })
            .lean();
        if (!assignment)
            throw new common_1.NotFoundException('No tenés un curso asignado');
        const rawClId = assignment.cursoLectivoId._id ?? assignment.cursoLectivoId;
        const cursoLectivoOid = new mongoose_2.Types.ObjectId(rawClId.toString());
        const enrollments = await this.enrollmentModel
            .find({ cursoLectivoId: cursoLectivoOid, status: 'enrolled' })
            .populate('studentId', 'name dni')
            .lean();
        const students = enrollments
            .map((e) => e.studentId)
            .sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', 'es', { sensitivity: 'base' }));
        return {
            ...assignment,
            students,
        };
    }
    async saveAttendance(dto, takenByUserId) {
        const date = new Date(dto.date);
        date.setUTCHours(0, 0, 0, 0);
        const cursoLectivo = await this.cursoLectivoModel
            .findById(dto.cursoLectivoId)
            .lean();
        if (!cursoLectivo)
            throw new common_1.NotFoundException('CursoLectivo no encontrado');
        const records = dto.records.map((r) => ({
            studentId: new mongoose_2.Types.ObjectId(r.studentId),
            status: r.status ?? 'present',
            note: r.note ?? '',
        }));
        const saved = await this.recordModel.findOneAndUpdate({ cursoLectivoId: new mongoose_2.Types.ObjectId(dto.cursoLectivoId), date }, {
            cursoId: cursoLectivo.cursoId,
            takenByUserId: new mongoose_2.Types.ObjectId(takenByUserId),
            records,
        }, { upsert: true, new: true });
        const absentIds = records
            .filter((r) => r.status === 'absent')
            .map((r) => r.studentId.toString());
        if (absentIds.length) {
            this.createAbsenceCommunicados(absentIds, date, takenByUserId).catch(() => { });
        }
        return { record: saved, absentCount: absentIds.length };
    }
    async createAbsenceCommunicados(studentIds, date, takenByUserId) {
        await Promise.all(studentIds.map((id) => this.communicadosService
            .createFromAbsence(id, date, takenByUserId)
            .catch(() => { })));
    }
    async getMyRecords(userId, query) {
        const { page = 1, limit = 10, dateFrom, dateTo } = query;
        const assignment = await this.assignmentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId), isActive: true })
            .lean();
        if (!assignment)
            throw new common_1.NotFoundException('No tenés un curso asignado');
        const filter = { cursoLectivoId: assignment.cursoLectivoId };
        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom)
                filter.date.$gte = new Date(dateFrom);
            if (dateTo)
                filter.date.$lte = new Date(dateTo);
        }
        const [data, total] = await Promise.all([
            this.recordModel
                .find(filter)
                .sort({ date: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            this.recordModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findAllRecords(query) {
        const { page = 1, limit = 10, cursoLectivoId, dateFrom, dateTo, studentId } = query;
        const filter = {};
        if (cursoLectivoId)
            filter.cursoLectivoId = new mongoose_2.Types.ObjectId(cursoLectivoId);
        if (studentId)
            filter['records.studentId'] = new mongoose_2.Types.ObjectId(studentId);
        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom)
                filter.date.$gte = new Date(dateFrom);
            if (dateTo)
                filter.date.$lte = new Date(dateTo);
        }
        const [data, total] = await Promise.all([
            this.recordModel
                .find(filter)
                .sort({ date: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            this.recordModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async getConsolidated(cursoLectivoId, dateFrom, dateTo) {
        if (!cursoLectivoId)
            throw new common_1.NotFoundException('cursoLectivoId requerido');
        const match = {
            cursoLectivoId: new mongoose_2.Types.ObjectId(cursoLectivoId),
        };
        if (dateFrom || dateTo) {
            match.date = {};
            if (dateFrom)
                match.date.$gte = new Date(dateFrom);
            if (dateTo)
                match.date.$lte = new Date(dateTo);
        }
        const [totalDays, entriesAgg] = await Promise.all([
            this.recordModel.countDocuments(match),
            this.recordModel.aggregate([
                { $match: match },
                { $unwind: '$records' },
                {
                    $group: {
                        _id: '$records.studentId',
                        present: {
                            $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] },
                        },
                        absent: {
                            $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] },
                        },
                        late: {
                            $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] },
                        },
                        excused: {
                            $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] },
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'students',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'student',
                    },
                },
                { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 0,
                        studentId: '$_id',
                        name: '$student.name',
                        dni: '$student.dni',
                        present: 1,
                        absent: 1,
                        late: 1,
                        excused: 1,
                    },
                },
                { $sort: { absent: -1 } },
            ]),
        ]);
        const totalStudents = entriesAgg.length;
        const totalPresences = entriesAgg.reduce((s, e) => s + e.present + e.late, 0);
        const totalAbsences = entriesAgg.reduce((s, e) => s + e.absent, 0);
        const totalPossible = totalStudents * totalDays;
        return {
            totalDays,
            totalStudents,
            totalPresences,
            totalAbsences,
            attendanceRate: totalPossible > 0
                ? Math.round((totalPresences / totalPossible) * 100)
                : 100,
            students: entriesAgg,
        };
    }
    async getStudentHistory(studentId, query) {
        const { page = 1, limit = 20, cursoLectivoId, dateFrom, dateTo } = query;
        const match = {
            'records.studentId': new mongoose_2.Types.ObjectId(studentId),
        };
        if (cursoLectivoId)
            match.cursoLectivoId = new mongoose_2.Types.ObjectId(cursoLectivoId);
        if (dateFrom || dateTo) {
            match.date = {};
            if (dateFrom)
                match.date.$gte = new Date(dateFrom);
            if (dateTo)
                match.date.$lte = new Date(dateTo);
        }
        const studentOid = new mongoose_2.Types.ObjectId(studentId);
        const [data, total] = await Promise.all([
            this.recordModel.aggregate([
                { $match: match },
                { $sort: { date: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $project: {
                        date: 1,
                        cursoLectivoId: 1,
                        entry: {
                            $first: {
                                $filter: {
                                    input: '$records',
                                    cond: { $eq: ['$$this.studentId', studentOid] },
                                },
                            },
                        },
                    },
                },
            ]),
            this.recordModel.countDocuments(match),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async getMyChildrenAttendance(parentUserId, query) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(parentUserId) })
            .select('studentIds')
            .lean();
        if (!parent)
            throw new common_1.NotFoundException('Perfil de representante no encontrado');
        if (!parent.studentIds?.length)
            return [];
        const { dateFrom, dateTo } = query;
        const studentOids = parent.studentIds.map((id) => new mongoose_2.Types.ObjectId(id.toString()));
        const match = {
            'records.studentId': { $in: studentOids },
        };
        if (dateFrom || dateTo) {
            match.date = {};
            if (dateFrom)
                match.date.$gte = new Date(dateFrom);
            if (dateTo)
                match.date.$lte = new Date(dateTo);
        }
        return this.recordModel.aggregate([
            { $match: match },
            { $unwind: '$records' },
            { $match: { 'records.studentId': { $in: studentOids } } },
            {
                $group: {
                    _id: '$records.studentId',
                    present: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] },
                    },
                    absent: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] },
                    },
                    late: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] },
                    },
                    excused: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] },
                    },
                    recentRecords: {
                        $push: {
                            date: '$date',
                            status: '$records.status',
                            note: '$records.note',
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'student',
                },
            },
            { $unwind: { path: '$student', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'enrollments',
                    localField: '_id',
                    foreignField: 'studentId',
                    as: 'enrollment',
                    pipeline: [
                        { $match: { status: 'enrolled' } },
                        {
                            $lookup: {
                                from: 'cursolectivos',
                                localField: 'cursoLectivoId',
                                foreignField: '_id',
                                as: 'cursoLectivo',
                                pipeline: [
                                    { $match: { status: 'active' } },
                                    {
                                        $lookup: {
                                            from: 'cursos',
                                            localField: 'cursoId',
                                            foreignField: '_id',
                                            as: 'curso',
                                        },
                                    },
                                    { $unwind: { path: '$curso', preserveNullAndEmptyArrays: true } },
                                ],
                            },
                        },
                        { $unwind: { path: '$cursoLectivo', preserveNullAndEmptyArrays: true } },
                        { $limit: 1 },
                    ],
                },
            },
            { $unwind: { path: '$enrollment', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 0,
                    studentId: '$_id',
                    name: '$student.name',
                    present: 1,
                    absent: 1,
                    late: 1,
                    excused: 1,
                    recentRecords: { $slice: ['$recentRecords', -10] },
                    cursoNombre: {
                        $cond: {
                            if: '$enrollment.cursoLectivo.curso',
                            then: {
                                $concat: [
                                    { $ifNull: ['$enrollment.cursoLectivo.curso.nivel', ''] },
                                    ' ',
                                    { $ifNull: ['$enrollment.cursoLectivo.curso.paralelo', ''] },
                                    ' ',
                                    { $ifNull: ['$enrollment.cursoLectivo.curso.jornada', ''] },
                                ],
                            },
                            else: '',
                        },
                    },
                    academicYear: { $ifNull: ['$enrollment.cursoLectivo.academicYear', ''] },
                },
            },
        ]);
    }
    async getMyChildrenHistory(parentUserId, studentId, query) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(parentUserId) })
            .select('studentIds')
            .lean();
        if (!parent)
            throw new common_1.NotFoundException('Perfil de representante no encontrado');
        const owns = (parent.studentIds ?? []).some((id) => id.toString() === studentId);
        if (!owns)
            throw new common_1.NotFoundException('Estudiante no encontrado');
        return this.getStudentHistory(studentId, query);
    }
    async getReporteMasivo(dto) {
        const { status, statuses, dateFrom, dateTo, minCount = 2, jornada } = dto;
        const resolvedStatuses = statuses && statuses.length > 0
            ? statuses
            : status
                ? [status]
                : ['absent'];
        const dateMatch = {};
        if (dateFrom)
            dateMatch.$gte = new Date(dateFrom);
        if (dateTo) {
            const to = new Date(dateTo);
            to.setUTCHours(23, 59, 59, 999);
            dateMatch.$lte = to;
        }
        const pipeline = [];
        if (Object.keys(dateMatch).length) {
            pipeline.push({ $match: { date: dateMatch } });
        }
        pipeline.push({ $unwind: '$records' }, { $match: { 'records.status': { $in: resolvedStatuses } } }, { $group: { _id: '$records.studentId', count: { $sum: 1 } } }, { $match: { count: { $gte: minCount } } });
        const counts = await this.recordModel.aggregate(pipeline);
        if (!counts.length)
            return [];
        const studentIds = counts.map((c) => c._id);
        const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
        const students = await this.studentModel
            .find({ _id: { $in: studentIds } })
            .select('name dni')
            .lean();
        const studentMap = new Map(students.map((s) => [s._id.toString(), { name: s.name, dni: s.dni }]));
        const enrollments = await this.enrollmentModel
            .find({ studentId: { $in: studentIds }, status: 'enrolled' })
            .sort({ createdAt: -1 })
            .populate({
            path: 'cursoLectivoId',
            populate: { path: 'cursoId', select: 'nivel paralelo jornada' },
        })
            .lean();
        const enrollmentMap = new Map();
        for (const e of enrollments) {
            const sid = e.studentId.toString();
            if (enrollmentMap.has(sid))
                continue;
            const cl = e.cursoLectivoId;
            const curso = cl?.cursoId;
            const cursoNombre = curso
                ? [curso.nivel, curso.paralelo, curso.jornada].filter(Boolean).join(' ')
                : '';
            enrollmentMap.set(sid, { cursoNombre, academicYear: cl?.academicYear ?? '' });
        }
        let result = studentIds.map((id) => {
            const sid = id.toString();
            const student = studentMap.get(sid);
            const enrollment = enrollmentMap.get(sid);
            return {
                studentId: sid,
                name: student?.name ?? 'Desconocido',
                dni: student?.dni,
                cursoNombre: enrollment?.cursoNombre ?? '',
                academicYear: enrollment?.academicYear ?? '',
                count: countMap.get(sid) ?? 0,
            };
        });
        if (jornada) {
            result = result.filter((r) => r.cursoNombre.includes(jornada));
        }
        return result;
    }
};
exports.AsistenciasService = AsistenciasService;
exports.AsistenciasService = AsistenciasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_assignment_schema_1.AttendanceAssignment.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(2, (0, mongoose_1.InjectModel)(curso_lectivo_schema_1.CursoLectivo.name)),
    __param(3, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __param(4, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __param(5, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        communicados_service_1.CommunicadosService])
], AsistenciasService);
//# sourceMappingURL=asistencias.service.js.map