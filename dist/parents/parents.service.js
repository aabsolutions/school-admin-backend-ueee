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
exports.ParentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const parent_schema_1 = require("./schemas/parent.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const enrollment_schema_1 = require("../enrollments/schemas/enrollment.schema");
const expediente_schema_1 = require("../expedientes/schemas/expediente.schema");
const expediente_registro_schema_1 = require("../expedientes/schemas/expediente-registro.schema");
const dece_expediente_schema_1 = require("../dece/schemas/dece-expediente.schema");
const dece_registro_schema_1 = require("../dece/schemas/dece-registro.schema");
const attendance_record_schema_1 = require("../asistencias/schemas/attendance-record.schema");
let ParentsService = class ParentsService {
    constructor(parentModel, studentModel, userModel, enrollmentModel, expedienteModel, expedienteRegistroModel, deceExpedienteModel, deceRegistroModel, attendanceRecordModel) {
        this.parentModel = parentModel;
        this.studentModel = studentModel;
        this.userModel = userModel;
        this.enrollmentModel = enrollmentModel;
        this.expedienteModel = expedienteModel;
        this.expedienteRegistroModel = expedienteRegistroModel;
        this.deceExpedienteModel = deceExpedienteModel;
        this.deceRegistroModel = deceRegistroModel;
        this.attendanceRecordModel = attendanceRecordModel;
    }
    async create(dto) {
        const { username, password, studentIds, email: rawEmail, ...parentData } = dto;
        const email = rawEmail || `${dto.dni}@escuela.local`;
        const resolvedUsername = username ?? dto.dni;
        const resolvedPassword = password ?? dto.dni;
        let savedUser = null;
        try {
            const user = new this.userModel({
                username: resolvedUsername,
                password: resolvedPassword,
                name: parentData.name,
                email,
                role: user_schema_1.Role.Parent,
                permissions: ['canRead'],
                isActive: true,
            });
            savedUser = await user.save();
            const parent = await new this.parentModel({
                ...parentData,
                email,
                userId: savedUser._id,
                studentIds: [],
            }).save();
            if (studentIds?.length) {
                await this._linkStudents(parent._id.toString(), studentIds);
                return this.findOne(parent._id.toString());
            }
            return parent;
        }
        catch (err) {
            if (savedUser)
                await this.userModel.findByIdAndDelete(savedUser._id).catch(() => { });
            if (err.code === 11000) {
                const field = Object.keys(err.keyPattern)[0];
                throw new common_1.ConflictException(`Ya existe un padre con ese ${field}`);
            }
            throw err;
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const filter = { isActive: true };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { dni: { $regex: search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.parentModel
                .find(filter)
                .populate('studentIds', 'name email dni')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.parentModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const parent = await this.parentModel
            .findById(id)
            .populate('studentIds', 'name email dni img status');
        if (!parent)
            throw new common_1.NotFoundException('Padre no encontrado');
        return parent;
    }
    async findByUserId(userId) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('studentIds', 'name email dni img status');
        if (!parent)
            throw new common_1.NotFoundException('Perfil de padre no encontrado');
        return parent;
    }
    async searchByName(q, studentId) {
        const filter = { isActive: true };
        if (studentId) {
            const studentOid = new mongoose_2.Types.ObjectId(studentId);
            filter.$or = [
                { studentIds: studentOid },
            ];
            const student = await this.studentModel
                .findById(studentOid)
                .select('fatherId motherId guardianId')
                .lean();
            if (student) {
                const roleRefs = [student.fatherId, student.motherId, student.guardianId].filter(Boolean);
                if (roleRefs.length) {
                    filter.$or = [{ studentIds: studentOid }, { _id: { $in: roleRefs } }];
                }
            }
        }
        else if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { dni: { $regex: q, $options: 'i' } },
            ];
        }
        return this.parentModel
            .find(filter)
            .select('name email dni mobile')
            .limit(20)
            .lean();
    }
    async getHijos(parentUserId) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(parentUserId) })
            .lean();
        if (!parent)
            throw new common_1.NotFoundException('Perfil de padre no encontrado');
        const parentOid = parent._id;
        const students = await this.studentModel
            .find({
            $or: [
                { _id: { $in: parent.studentIds ?? [] } },
                { fatherId: parentOid },
                { motherId: parentOid },
                { guardianId: parentOid },
            ],
        })
            .select('name email dni img imgCuerpoEntero gender birthdate address status mobile')
            .lean();
        if (students.length && (parent.studentIds?.length ?? 0) !== students.length) {
            const ids = students.map((s) => s._id);
            await this.parentModel.updateOne({ _id: parentOid }, { $set: { studentIds: ids } });
        }
        return students;
    }
    async getHijosActivos(parentUserId) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(parentUserId) })
            .lean();
        if (!parent)
            throw new common_1.NotFoundException('Perfil de padre no encontrado');
        const parentOid = parent._id;
        const students = await this.studentModel
            .find({
            $or: [
                { _id: { $in: parent.studentIds ?? [] } },
                { fatherId: parentOid },
                { motherId: parentOid },
                { guardianId: parentOid },
            ],
        })
            .select('name email dni img gender status')
            .lean();
        if (!students.length)
            return [];
        const studentIds = students.map((s) => s._id);
        const enrollments = await this.enrollmentModel.aggregate([
            { $match: { studentId: { $in: studentIds }, status: 'enrolled' } },
            {
                $lookup: {
                    from: 'cursolectivos',
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
            {
                $project: {
                    studentId: 1,
                    academicYear: '$cursoLectivo.academicYear',
                    cursoNombre: {
                        $concat: ['$curso.nivel', ' ', '$curso.paralelo', ' ', '$curso.jornada'],
                    },
                },
            },
        ]);
        const enrollmentMap = new Map(enrollments.map((e) => [e.studentId.toString(), { cursoNombre: e.cursoNombre, academicYear: e.academicYear }]));
        return students.map((student) => {
            const enrollment = enrollmentMap.get(student._id.toString());
            return {
                student,
                cursoNombre: enrollment?.cursoNombre ?? '',
                academicYear: enrollment?.academicYear ?? '',
            };
        });
    }
    async update(id, dto) {
        const parent = await this.parentModel
            .findByIdAndUpdate(id, { $set: dto }, { returnDocument: 'after' })
            .populate('studentIds', 'name email dni img status');
        if (!parent)
            throw new common_1.NotFoundException('Padre no encontrado');
        return parent;
    }
    async linkStudents(parentId, studentIds) {
        await this._linkStudents(parentId, studentIds);
        return this.findOne(parentId);
    }
    async unlinkStudent(parentId, studentId) {
        const parentOid = new mongoose_2.Types.ObjectId(parentId);
        const studentOid = new mongoose_2.Types.ObjectId(studentId);
        await Promise.all([
            this.parentModel.updateOne({ _id: parentOid }, { $pull: { studentIds: studentOid } }),
            this.studentModel.updateOne({ _id: studentOid }, { $pull: { parentIds: parentOid } }),
        ]);
        return this.findOne(parentId);
    }
    async remove(id) {
        const parent = await this.parentModel.findById(id);
        if (!parent)
            throw new common_1.NotFoundException('Padre no encontrado');
        const parentOid = parent._id;
        await Promise.all([
            this.parentModel.findByIdAndDelete(id),
            parent.userId
                ? this.userModel.findByIdAndDelete(parent.userId).catch(() => { })
                : Promise.resolve(),
            this.studentModel.updateMany({ _id: { $in: parent.studentIds } }, { $pull: { parentIds: parentOid } }),
            this.studentModel.updateMany({ fatherId: parentOid }, { $set: { fatherId: null } }),
            this.studentModel.updateMany({ motherId: parentOid }, { $set: { motherId: null } }),
            this.studentModel.updateMany({ guardianId: parentOid }, { $set: { guardianId: null } }),
        ]);
    }
    async checkBulkDuplicates(dnis, emails) {
        const [byDni, byEmail] = await Promise.all([
            dnis.length ? this.parentModel.find({ dni: { $in: dnis } }).select('dni').lean() : [],
            emails.length ? this.parentModel.find({ email: { $in: emails.map((e) => e.toLowerCase()) } }).select('email').lean() : [],
        ]);
        return {
            duplicateDnis: byDni.map((p) => p.dni),
            duplicateEmails: byEmail.map((p) => p.email),
        };
    }
    async bulkCreate(records) {
        const created = [];
        const failed = [];
        for (let i = 0; i < records.length; i++) {
            try {
                const record = records[i];
                const email = record.email?.trim() || `${(record.dni ?? '').replace(/\s/g, '')}@escuela.local`;
                const parent = await this.create({ ...record, email });
                created.push(parent);
            }
            catch (e) {
                failed.push({ row: i + 2, data: records[i], error: e.message ?? 'Error desconocido' });
            }
        }
        return { total: records.length, successCount: created.length, failureCount: failed.length, created, failed };
    }
    async getHijosDashboard(parentUserId) {
        const students = await this.getHijos(parentUserId);
        if (!students.length)
            return [];
        const studentIds = students.map((s) => s._id);
        const enrollmentDocs = await this.enrollmentModel
            .find({ studentId: { $in: studentIds }, status: 'enrolled' })
            .sort({ createdAt: -1 })
            .populate({
            path: 'cursoLectivoId',
            populate: { path: 'cursoId', select: 'nivel paralelo jornada' },
        })
            .lean()
            .exec();
        const enrollmentMap = new Map();
        for (const e of enrollmentDocs) {
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
        const expedientes = await this.expedienteModel
            .find({ studentId: { $in: studentIds } })
            .select('_id studentId')
            .lean();
        const expedienteIdMap = new Map(expedientes.map((e) => [e.studentId.toString(), e._id.toString()]));
        const expedienteIds = expedientes.map((e) => e._id);
        const deceExpedientes = await this.deceExpedienteModel
            .find({ studentId: { $in: studentIds } })
            .select('_id studentId')
            .lean();
        const deceExpedienteIdMap = new Map(deceExpedientes.map((e) => [e.studentId.toString(), e._id.toString()]));
        const deceExpedienteIds = deceExpedientes.map((e) => e._id);
        const expRegCounts = await this.expedienteRegistroModel.aggregate([
            { $match: { expedienteId: { $in: expedienteIds } } },
            { $group: { _id: '$expedienteId', count: { $sum: 1 } } },
        ]);
        const expRegCountMap = new Map(expRegCounts.map((r) => [r._id.toString(), r.count]));
        const deceRegCounts = await this.deceRegistroModel.aggregate([
            { $match: { expedienteId: { $in: deceExpedienteIds } } },
            { $group: { _id: '$expedienteId', count: { $sum: 1 } } },
        ]);
        const deceRegCountMap = new Map(deceRegCounts.map((r) => [r._id.toString(), r.count]));
        const attendanceAgg = await this.attendanceRecordModel.aggregate([
            { $match: { 'records.studentId': { $in: studentIds } } },
            { $unwind: '$records' },
            { $match: { 'records.studentId': { $in: studentIds } } },
            {
                $group: {
                    _id: '$records.studentId',
                    present: { $sum: { $cond: [{ $eq: ['$records.status', 'present'] }, 1, 0] } },
                    absent: { $sum: { $cond: [{ $eq: ['$records.status', 'absent'] }, 1, 0] } },
                    late: { $sum: { $cond: [{ $eq: ['$records.status', 'late'] }, 1, 0] } },
                    excused: { $sum: { $cond: [{ $eq: ['$records.status', 'excused'] }, 1, 0] } },
                },
            },
        ]);
        const attendanceMap = new Map(attendanceAgg.map((a) => [a._id.toString(), { present: a.present, absent: a.absent, late: a.late, excused: a.excused }]));
        return students.map((student) => {
            const sid = student._id.toString();
            const enrollment = enrollmentMap.get(sid);
            const expId = expedienteIdMap.get(sid);
            const deceId = deceExpedienteIdMap.get(sid);
            const att = attendanceMap.get(sid) ?? { present: 0, absent: 0, late: 0, excused: 0 };
            const total = att.present + att.absent + att.late + att.excused;
            const attended = att.present + att.late;
            return {
                student,
                cursoNombre: enrollment?.cursoNombre ?? '',
                academicYear: enrollment?.academicYear ?? '',
                expedientesCount: expId ? (expRegCountMap.get(expId) ?? 0) : 0,
                deceCount: deceId ? (deceRegCountMap.get(deceId) ?? 0) : 0,
                attendanceStats: {
                    ...att,
                    rate: total > 0 ? Math.round((attended / total) * 100) : 0,
                },
            };
        });
    }
    async getHijoFicha(parentUserId, studentId) {
        const parent = await this.parentModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(parentUserId) })
            .lean();
        if (!parent)
            throw new common_1.NotFoundException('Perfil de padre no encontrado');
        const parentOid = parent._id;
        const studentOid = new mongoose_2.Types.ObjectId(studentId);
        const student = await this.studentModel
            .findOne({
            _id: studentOid,
            $or: [
                { _id: { $in: parent.studentIds ?? [] } },
                { fatherId: parentOid },
                { motherId: parentOid },
                { guardianId: parentOid },
            ],
        })
            .lean();
        if (!student)
            throw new common_1.NotFoundException('Estudiante no encontrado o no vinculado');
        return student;
    }
    async _linkStudents(parentId, studentIds) {
        const parentOid = new mongoose_2.Types.ObjectId(parentId);
        const studentOids = studentIds.map((s) => new mongoose_2.Types.ObjectId(s));
        await Promise.all([
            this.parentModel.updateOne({ _id: parentOid }, { $addToSet: { studentIds: { $each: studentOids } } }),
            this.studentModel.updateMany({ _id: { $in: studentOids } }, { $addToSet: { parentIds: parentOid } }),
        ]);
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __param(1, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __param(4, (0, mongoose_1.InjectModel)(expediente_schema_1.Expediente.name)),
    __param(5, (0, mongoose_1.InjectModel)(expediente_registro_schema_1.ExpedienteRegistro.name)),
    __param(6, (0, mongoose_1.InjectModel)(dece_expediente_schema_1.DeceExpediente.name)),
    __param(7, (0, mongoose_1.InjectModel)(dece_registro_schema_1.DeceRegistro.name)),
    __param(8, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ParentsService);
//# sourceMappingURL=parents.service.js.map