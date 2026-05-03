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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.ADMIN_MANAGEABLE_ROLES = [user_schema_1.Role.Teacher, user_schema_1.Role.Student];
        this.RESERVED_ROLES = [user_schema_1.Role.Student, user_schema_1.Role.Teacher];
    }
    async create(dto, callerRole) {
        if (this.RESERVED_ROLES.includes(dto.role)) {
            throw new common_1.BadRequestException('Los roles STUDENT y TEACHER se asignan automáticamente al dar de alta un estudiante o docente. No se pueden crear desde esta UI.');
        }
        this.assertCanManageRole(callerRole, dto.role);
        const existing = await this.userModel.findOne({
            $or: [{ username: dto.username }, { email: dto.email }],
        });
        if (existing)
            throw new common_1.ConflictException('Username or email already in use');
        const user = new this.userModel(dto);
        return user.save();
    }
    async findAll(callerRole) {
        const filter = callerRole === user_schema_1.Role.SuperAdmin
            ? {}
            : { role: { $in: this.ADMIN_MANAGEABLE_ROLES } };
        return this.userModel.find(filter).select('-password').exec();
    }
    async findAllForMessaging() {
        return this.userModel.find({ isActive: true }).select('name username role avatar').exec();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username }).select('+password').exec();
    }
    async update(id, dto, callerRole) {
        if (dto.role && this.RESERVED_ROLES.includes(dto.role)) {
            throw new common_1.BadRequestException('No se puede asignar el rol STUDENT o TEACHER manualmente.');
        }
        const target = await this.findOne(id);
        this.assertCanManageRole(callerRole, target.role);
        if (dto.password) {
            target.set(dto);
            return target.save();
        }
        const updated = await this.userModel
            .findByIdAndUpdate(id, dto, { new: true })
            .select('-password');
        if (!updated)
            throw new common_1.NotFoundException('User not found');
        return updated;
    }
    async toggleStatus(id, callerRole) {
        const target = await this.findOne(id);
        this.assertCanManageRole(callerRole, target.role);
        target.isActive = !target.isActive;
        return target.save();
    }
    async remove(id, callerRole) {
        const target = await this.findOne(id);
        this.assertCanManageRole(callerRole, target.role);
        await this.userModel.findByIdAndDelete(id);
    }
    async resetPasswordToUsername(id, callerRole) {
        const target = await this.userModel.findById(id).select('+password');
        if (!target)
            throw new common_1.NotFoundException('User not found');
        this.assertCanManageRole(callerRole, target.role);
        target.password = target.username;
        await target.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }
    async setResetToken(userId, tokenHash, expires) {
        await this.userModel.findByIdAndUpdate(userId, {
            resetPasswordToken: tokenHash,
            resetPasswordExpires: expires,
        });
    }
    async findByResetToken(tokenHash) {
        return this.userModel
            .findOne({
            resetPasswordToken: tokenHash,
            resetPasswordExpires: { $gt: new Date() },
        })
            .select('+resetPasswordToken +resetPasswordExpires +password')
            .exec();
    }
    async resetPassword(userId, newPassword) {
        const user = await this.userModel.findById(userId).select('+password');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
    }
    async findMe(id) {
        return this.findOne(id);
    }
    async updateMe(id, dto) {
        const user = await this.userModel.findById(id).select('+password').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.set(dto);
        await user.save();
        return this.findOne(id);
    }
    assertCanManageRole(callerRole, targetRole) {
        if (callerRole === user_schema_1.Role.SuperAdmin)
            return;
        if (!this.ADMIN_MANAGEABLE_ROLES.includes(targetRole)) {
            throw new common_1.ForbiddenException('ADMIN can only manage TEACHER and STUDENT accounts');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map