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
let ParentsService = class ParentsService {
    constructor(parentModel, studentModel, userModel) {
        this.parentModel = parentModel;
        this.studentModel = studentModel;
        this.userModel = userModel;
    }
    async create(dto) {
        const { username, password, studentIds, ...parentData } = dto;
        const resolvedUsername = username ?? dto.dni ?? dto.email;
        const resolvedPassword = password ?? dto.dni ?? dto.email;
        let savedUser = null;
        try {
            const user = new this.userModel({
                username: resolvedUsername,
                password: resolvedPassword,
                name: parentData.name,
                email: parentData.email,
                role: user_schema_1.Role.Parent,
                permissions: ['canRead'],
                isActive: true,
            });
            savedUser = await user.save();
            const parent = await new this.parentModel({
                ...parentData,
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
        const filter = {};
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
    async update(id, dto) {
        const parent = await this.parentModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true })
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
        await Promise.all([
            this.parentModel.findByIdAndUpdate(id, { isActive: false }),
            this.userModel.findByIdAndUpdate(parent.userId, { isActive: false }),
        ]);
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
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ParentsService);
//# sourceMappingURL=parents.service.js.map