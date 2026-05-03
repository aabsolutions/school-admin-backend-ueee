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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const update_medical_info_dto_1 = require("./dto/update-medical-info.dto");
const update_family_info_dto_1 = require("./dto/update-family-info.dto");
const update_student_general_dto_1 = require("./dto/update-student-general.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const mongoose_1 = require("mongoose");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    getMe(user) {
        return this.studentsService.findByUserId(user.id);
    }
    updateMyGeneral(user, dto) {
        return this.studentsService.findByUserId(user.id).then(s => this.studentsService.updateGeneralInfo(s._id.toString(), dto));
    }
    updateMyMedical(user, dto) {
        return this.studentsService.findByUserId(user.id).then(s => this.studentsService.updateMedicalInfo(s._id.toString(), dto));
    }
    updateMyFamily(user, dto) {
        return this.studentsService.findByUserId(user.id).then(s => this.studentsService.updateFamilyInfo(s._id.toString(), dto));
    }
    getReporteMedico(filters) {
        return this.studentsService.getReporteMedico(filters);
    }
    findAll(query) {
        return this.studentsService.findAll(query);
    }
    findOne(id) {
        return this.studentsService.findOne(id.toString());
    }
    create(dto) {
        return this.studentsService.create(dto);
    }
    update(id, dto) {
        return this.studentsService.update(id.toString(), dto);
    }
    toggleStatus(id, status) {
        return this.studentsService.toggleStatus(id.toString(), status);
    }
    updateMedical(id, dto) {
        return this.studentsService.updateMedicalInfo(id.toString(), dto);
    }
    updateFamily(id, dto) {
        return this.studentsService.updateFamilyInfo(id.toString(), dto);
    }
    remove(id) {
        return this.studentsService.remove(id.toString());
    }
    uploadPhoto(id, file, type, peso, talla) {
        return this.studentsService.uploadPhoto(id.toString(), file, type, peso ? +peso : undefined, talla ? +talla : undefined);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_student_general_dto_1.UpdateStudentGeneralDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateMyGeneral", null);
__decorate([
    (0, common_1.Patch)('me/medical'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_medical_info_dto_1.UpdateStudentMedicalInfoDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateMyMedical", null);
__decorate([
    (0, common_1.Patch)('me/family'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_family_info_dto_1.UpdateStudentFamilyInfoDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateMyFamily", null);
__decorate([
    (0, common_1.Get)('reporte-medico'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getReporteMedico", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin, user_schema_1.Role.Teacher),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Patch)(':id/medical'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_medical_info_dto_1.UpdateStudentMedicalInfoDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateMedical", null);
__decorate([
    (0, common_1.Patch)(':id/family'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_family_info_dto_1.UpdateStudentFamilyInfoDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateFamily", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/photo'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student, user_schema_1.Role.Teacher, user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { limits: { fileSize: 5 * 1024 * 1024 } })),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
    }))),
    __param(2, (0, common_1.Body)('type')),
    __param(3, (0, common_1.Body)('peso')),
    __param(4, (0, common_1.Body)('talla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, String, String, String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "uploadPhoto", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map