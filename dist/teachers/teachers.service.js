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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const teacher_schema_1 = require("./schemas/teacher.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const user_schema_2 = require("../users/schemas/user.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let TeachersService = class TeachersService {
    constructor(teacherModel, userModel, cloudinaryService) {
        this.teacherModel = teacherModel;
        this.userModel = userModel;
        this.cloudinaryService = cloudinaryService;
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
            this.teacherModel
                .find(filter)
                .populate('departmentId', 'departmentName')
                .populate('areaEstudioId', 'nombre')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.teacherModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const teacher = await this.teacherModel.findById(id).populate('departmentId', 'departmentName').populate('areaEstudioId', 'nombre');
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        return teacher;
    }
    async create(dto) {
        const { username, password, ...teacherData } = dto;
        const resolvedUsername = username ?? teacherData.dni ?? teacherData.email;
        const resolvedPassword = password ?? teacherData.dni ?? teacherData.email;
        let savedUser = null;
        try {
            const user = new this.userModel({
                username: resolvedUsername,
                password: resolvedPassword,
                name: teacherData.name,
                email: teacherData.email,
                role: user_schema_2.Role.Teacher,
                permissions: ['canEdit', 'canRead'],
                isActive: true,
            });
            savedUser = await user.save();
            const saved = await new this.teacherModel({ ...teacherData, userId: savedUser._id }).save();
            return (await saved.populate('departmentId', 'departmentName')).populate('areaEstudioId', 'nombre');
        }
        catch (err) {
            if (savedUser)
                await this.userModel.findByIdAndDelete(savedUser._id).catch(() => { });
            if (err.code === 11000) {
                const field = Object.keys(err.keyPattern)[0];
                throw new common_1.ConflictException(`Ya existe un docente con ese ${field}`);
            }
            throw err;
        }
    }
    async update(id, dto) {
        const updated = await this.teacherModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre');
        if (!updated)
            throw new common_1.NotFoundException('Teacher not found');
        return updated;
    }
    async remove(id) {
        const result = await this.teacherModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Teacher not found');
    }
    async findByUserId(userId) {
        let teacher = await this.teacherModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre');
        if (!teacher) {
            const user = await this.userModel.findById(userId).select('email').exec();
            if (user) {
                teacher = await this.teacherModel
                    .findOne({ email: user.email })
                    .populate('departmentId', 'departmentName')
                    .populate('areaEstudioId', 'nombre');
                if (teacher) {
                    teacher.userId = new mongoose_2.Types.ObjectId(userId);
                    await teacher.save();
                }
            }
        }
        if (!teacher)
            throw new common_1.NotFoundException('Teacher profile not found');
        return teacher;
    }
    async updateGeneralInfo(id, dto) {
        const updated = await this.teacherModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true })
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre');
        if (!updated)
            throw new common_1.NotFoundException('Teacher not found');
        return updated;
    }
    async updateMedicalInfo(id, dto) {
        const update = {};
        for (const [key, val] of Object.entries(dto)) {
            update[`medicalInfo.${key}`] = val;
        }
        const updated = await this.teacherModel
            .findByIdAndUpdate(id, { $set: update }, { new: true })
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre');
        if (!updated)
            throw new common_1.NotFoundException('Teacher not found');
        return updated;
    }
    async updateFamilyInfo(id, dto) {
        const update = {};
        for (const [key, val] of Object.entries(dto)) {
            update[`familyInfo.${key}`] = val;
        }
        const updated = await this.teacherModel
            .findByIdAndUpdate(id, { $set: update }, { new: true })
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre');
        if (!updated)
            throw new common_1.NotFoundException('Teacher not found');
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
        if (filters.maritalStatus)
            match['familyInfo.maritalStatus'] = filters.maritalStatus;
        if (filters.numberOfChildren !== undefined)
            match['familyInfo.numberOfChildren'] = Number(filters.numberOfChildren);
        return this.teacherModel.find(match)
            .select('name dni mobile address gender birthdate status laboralDependency salarialCategory medicalInfo familyInfo')
            .populate('departmentId', 'departmentName')
            .populate('areaEstudioId', 'nombre')
            .sort({ name: 1 })
            .exec();
    }
    async uploadPhoto(id, file, type, peso, talla) {
        const folder = type === 'credencial' ? 'teachers/credencial' : 'teachers/cuerpo';
        const url = await this.cloudinaryService.uploadBuffer(file.buffer, folder);
        const update = type === 'credencial'
            ? { img: url }
            : { imgCuerpoEntero: url, ...(peso != null && { peso }), ...(talla != null && { talla }) };
        const updated = await this.teacherModel.findByIdAndUpdate(id, update, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Teacher not found');
        return updated;
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map