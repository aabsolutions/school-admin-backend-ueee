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
var StudentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("./schemas/student.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const user_schema_2 = require("../users/schemas/user.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let StudentsService = StudentsService_1 = class StudentsService {
    constructor(studentModel, userModel, parentModel, cloudinaryService) {
        this.studentModel = studentModel;
        this.userModel = userModel;
        this.parentModel = parentModel;
        this.cloudinaryService = cloudinaryService;
        this.logger = new common_1.Logger(StudentsService_1.name);
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.studentModel
                .find(filter)
                .populate('fatherId motherId guardianId', 'name email dni')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.studentModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const student = await this.studentModel.findById(id);
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        return student;
    }
    async create(dto) {
        const { username, password, fatherId, motherId, guardianId, ...studentData } = dto;
        const resolvedUsername = username ?? studentData.dni ?? studentData.email;
        const resolvedPassword = password ?? studentData.dni ?? studentData.email;
        const parentIds = this._deriveParentIds(fatherId, motherId, guardianId);
        let savedUser = null;
        try {
            const user = new this.userModel({
                username: resolvedUsername,
                password: resolvedPassword,
                name: studentData.name,
                email: studentData.email,
                role: user_schema_2.Role.Student,
                permissions: ['canRead'],
                isActive: true,
            });
            savedUser = await user.save();
            const student = await new this.studentModel({
                ...studentData,
                userId: savedUser._id,
                fatherId: fatherId ? new mongoose_2.Types.ObjectId(fatherId) : null,
                motherId: motherId ? new mongoose_2.Types.ObjectId(motherId) : null,
                guardianId: guardianId ? new mongoose_2.Types.ObjectId(guardianId) : null,
                parentIds: parentIds.map((p) => new mongoose_2.Types.ObjectId(p)),
            }).save();
            if (parentIds.length) {
                const studentOid = student._id;
                await this.parentModel.updateMany({ _id: { $in: parentIds.map((p) => new mongoose_2.Types.ObjectId(p)) } }, { $addToSet: { studentIds: studentOid } });
            }
            return this.studentModel.findById(student._id).populate('fatherId motherId guardianId', 'name email dni');
        }
        catch (err) {
            if (savedUser)
                await this.userModel.findByIdAndDelete(savedUser._id).catch(() => { });
            if (err.code === 11000) {
                const field = Object.keys(err.keyPattern)[0];
                throw new common_1.ConflictException(`Ya existe un estudiante con ese ${field}`);
            }
            throw err;
        }
    }
    async update(id, dto) {
        const { fatherId, motherId, guardianId, ...rest } = dto;
        const updateData = { ...rest };
        if (fatherId !== undefined || motherId !== undefined || guardianId !== undefined) {
            const current = await this.studentModel.findById(id).select('fatherId motherId guardianId parentIds').lean();
            if (!current)
                throw new common_1.NotFoundException('Student not found');
            const newFather = fatherId !== undefined ? fatherId : current.fatherId?.toString() ?? null;
            const newMother = motherId !== undefined ? motherId : current.motherId?.toString() ?? null;
            const newGuardian = guardianId !== undefined ? guardianId : current.guardianId?.toString() ?? null;
            const newParentIds = this._deriveParentIds(newFather, newMother, newGuardian);
            const oldParentIds = (current.parentIds ?? []).map((o) => o.toString());
            const toAdd = newParentIds.filter((p) => !oldParentIds.includes(p));
            const toRemove = oldParentIds.filter((p) => !newParentIds.includes(p));
            const studentOid = new mongoose_2.Types.ObjectId(id);
            await Promise.all([
                toAdd.length
                    ? this.parentModel.updateMany({ _id: { $in: toAdd.map((p) => new mongoose_2.Types.ObjectId(p)) } }, { $addToSet: { studentIds: studentOid } })
                    : Promise.resolve(),
                toRemove.length
                    ? this.parentModel.updateMany({ _id: { $in: toRemove.map((p) => new mongoose_2.Types.ObjectId(p)) } }, { $pull: { studentIds: studentOid } })
                    : Promise.resolve(),
            ]);
            updateData.fatherId = newFather ? new mongoose_2.Types.ObjectId(newFather) : null;
            updateData.motherId = newMother ? new mongoose_2.Types.ObjectId(newMother) : null;
            updateData.guardianId = newGuardian ? new mongoose_2.Types.ObjectId(newGuardian) : null;
            updateData.parentIds = newParentIds.map((p) => new mongoose_2.Types.ObjectId(p));
        }
        const updated = await this.studentModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('fatherId motherId guardianId', 'name email dni');
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
    _deriveParentIds(fatherId, motherId, guardianId) {
        return [...new Set([fatherId, motherId, guardianId].filter(Boolean))];
    }
    async remove(id) {
        const result = await this.studentModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Student not found');
    }
    async toggleStatus(id, status) {
        const updated = await this.studentModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
    async findByUserId(userId) {
        let student = await this.studentModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (!student) {
            const user = await this.userModel.findById(userId).select('email').exec();
            if (user) {
                student = await this.studentModel.findOne({ email: user.email });
                if (student) {
                    student.userId = new mongoose_2.Types.ObjectId(userId);
                    await student.save();
                }
            }
        }
        if (!student)
            throw new common_1.NotFoundException('Student profile not found');
        return student;
    }
    async updateGeneralInfo(id, dto) {
        const updated = await this.studentModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
    async updateMedicalInfo(id, dto) {
        const update = {};
        for (const [key, val] of Object.entries(dto)) {
            update[`medicalInfo.${key}`] = val;
        }
        const updated = await this.studentModel.findByIdAndUpdate(id, { $set: update }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
    async updateFamilyInfo(id, dto) {
        const update = {};
        for (const [key, val] of Object.entries(dto)) {
            update[`familyInfo.${key}`] = val;
        }
        const updated = await this.studentModel.findByIdAndUpdate(id, { $set: update }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
    async getReporteMedico(filters) {
        const match = {};
        if (filters.hasDisability !== undefined)
            match['medicalInfo.hasDisability'] = filters.hasDisability === 'true';
        if (filters.hasAllergies !== undefined)
            match['medicalInfo.hasAllergies'] = filters.hasAllergies === 'true';
        if (filters.hasChronicCondition !== undefined)
            match['medicalInfo.hasChronicCondition'] = filters.hasChronicCondition === 'true';
        if (filters.hasConadis !== undefined)
            match['medicalInfo.hasConadis'] = filters.hasConadis === 'true';
        if (filters.bloodType)
            match['medicalInfo.bloodType'] = filters.bloodType;
        if (filters.familySituation)
            match['familyInfo.familySituation'] = filters.familySituation;
        if (filters.socioeconomicLevel)
            match['familyInfo.socioeconomicLevel'] = filters.socioeconomicLevel;
        if (filters.housingType)
            match['familyInfo.housingType'] = filters.housingType;
        if (filters.numberOfSiblings !== undefined)
            match['familyInfo.numberOfSiblings'] = Number(filters.numberOfSiblings);
        return this.studentModel.find(match).select('name dni mobile address gender birthdate status medicalInfo familyInfo parentGuardianName parentGuardianMobile').sort({ name: 1 }).exec();
    }
    async uploadPhoto(id, file, type, peso, talla) {
        const folder = type === 'credencial' ? 'students/credencial' : 'students/cuerpo';
        const url = await this.cloudinaryService.uploadBuffer(file.buffer, folder);
        const update = type === 'credencial'
            ? { img: url }
            : { imgCuerpoEntero: url, ...(peso != null && { peso }), ...(talla != null && { talla }) };
        const updated = await this.studentModel.findByIdAndUpdate(id, update, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Student not found');
        return updated;
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = StudentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], StudentsService);
//# sourceMappingURL=students.service.js.map