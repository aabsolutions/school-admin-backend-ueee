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
exports.AsistenciasController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const asistencias_service_1 = require("./asistencias.service");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const save_attendance_dto_1 = require("./dto/save-attendance.dto");
const attendance_query_dto_1 = require("./dto/attendance-query.dto");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const user_schema_1 = require("../users/schemas/user.schema");
let AsistenciasController = class AsistenciasController {
    constructor(asistenciasService) {
        this.asistenciasService = asistenciasService;
    }
    createAssignment(dto) {
        return this.asistenciasService.createAssignment(dto);
    }
    findAllAssignments(query) {
        return this.asistenciasService.findAllAssignments(query);
    }
    getMyAssignment(user) {
        return this.asistenciasService.getMyAssignment(user.id);
    }
    deleteAssignment(id) {
        return this.asistenciasService.deleteAssignment(id.toString());
    }
    saveAttendance(dto, user) {
        return this.asistenciasService.saveAttendance(dto, user.id);
    }
    getMyRecords(user, query) {
        return this.asistenciasService.getMyRecords(user.id, query);
    }
    getConsolidated(cursoLectivoId, dateFrom, dateTo) {
        return this.asistenciasService.getConsolidated(cursoLectivoId, dateFrom, dateTo);
    }
    getMyChildrenAttendance(user, query) {
        return this.asistenciasService.getMyChildrenAttendance(user.id, query);
    }
    getStudentHistory(id, query) {
        return this.asistenciasService.getStudentHistory(id.toString(), query);
    }
    findAllRecords(query) {
        return this.asistenciasService.findAllRecords(query);
    }
};
exports.AsistenciasController = AsistenciasController;
__decorate([
    (0, common_1.Post)('assignments'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "findAllAssignments", null);
__decorate([
    (0, common_1.Get)('assignments/me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin, user_schema_1.Role.Teacher, user_schema_1.Role.Student, user_schema_1.Role.Parent),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "getMyAssignment", null);
__decorate([
    (0, common_1.Delete)('assignments/:id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "deleteAssignment", null);
__decorate([
    (0, common_1.Post)('records'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin, user_schema_1.Role.Teacher),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_attendance_dto_1.SaveAttendanceDto, Object]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "saveAttendance", null);
__decorate([
    (0, common_1.Get)('records/mine'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin, user_schema_1.Role.Teacher),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, attendance_query_dto_1.AttendanceQueryDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "getMyRecords", null);
__decorate([
    (0, common_1.Get)('records/consolidated'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Query)('cursoLectivoId')),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "getConsolidated", null);
__decorate([
    (0, common_1.Get)('records/my-children'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Parent),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, attendance_query_dto_1.AttendanceQueryDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "getMyChildrenAttendance", null);
__decorate([
    (0, common_1.Get)('records/student/:id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin, user_schema_1.Role.Teacher, user_schema_1.Role.Student),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, attendance_query_dto_1.AttendanceQueryDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "getStudentHistory", null);
__decorate([
    (0, common_1.Get)('records'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_query_dto_1.AttendanceQueryDto]),
    __metadata("design:returntype", void 0)
], AsistenciasController.prototype, "findAllRecords", null);
exports.AsistenciasController = AsistenciasController = __decorate([
    (0, common_1.Controller)('asistencias'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [asistencias_service_1.AsistenciasService])
], AsistenciasController);
//# sourceMappingURL=asistencias.controller.js.map