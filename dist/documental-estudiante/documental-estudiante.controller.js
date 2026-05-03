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
exports.DocumentalEstudianteController = void 0;
const common_1 = require("@nestjs/common");
const documental_estudiante_service_1 = require("./documental-estudiante.service");
const update_documental_estudiante_dto_1 = require("./dto/update-documental-estudiante.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const mongoose_1 = require("mongoose");
const students_service_1 = require("../students/students.service");
let DocumentalEstudianteController = class DocumentalEstudianteController {
    constructor(svc, studentsService) {
        this.svc = svc;
        this.studentsService = studentsService;
    }
    findAll(query) {
        return this.svc.findAll(query);
    }
    findByStudent(id) {
        return this.svc.findByStudent(id.toString());
    }
    getOrCreate(id) {
        return this.svc.getOrCreate(id.toString());
    }
    update(id, dto) {
        return this.svc.update(id.toString(), dto);
    }
    async getMe(user) {
        const student = await this.studentsService.findByUserId(user.id);
        return this.svc.getOrCreate(student._id.toString());
    }
};
exports.DocumentalEstudianteController = DocumentalEstudianteController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], DocumentalEstudianteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DocumentalEstudianteController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Post)('student/:studentId/get-or-create'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DocumentalEstudianteController.prototype, "getOrCreate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_documental_estudiante_dto_1.UpdateDocumentalEstudianteDto]),
    __metadata("design:returntype", void 0)
], DocumentalEstudianteController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentalEstudianteController.prototype, "getMe", null);
exports.DocumentalEstudianteController = DocumentalEstudianteController = __decorate([
    (0, common_1.Controller)('documental-estudiante'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [documental_estudiante_service_1.DocumentalEstudianteService,
        students_service_1.StudentsService])
], DocumentalEstudianteController);
//# sourceMappingURL=documental-estudiante.controller.js.map