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
exports.ParentsController = void 0;
const common_1 = require("@nestjs/common");
const parents_service_1 = require("./parents.service");
const create_parent_dto_1 = require("./dto/create-parent.dto");
const update_parent_dto_1 = require("./dto/update-parent.dto");
const link_students_dto_1 = require("./dto/link-students.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const mongoose_1 = require("mongoose");
let ParentsController = class ParentsController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll(query) {
        return this.svc.findAll(query);
    }
    create(dto) {
        return this.svc.create(dto);
    }
    search(q = '', studentId) {
        return this.svc.searchByName(q, studentId);
    }
    getMe(user) {
        return this.svc.findByUserId(user.id);
    }
    getHijos(user) {
        return this.svc.getHijos(user.id);
    }
    findOne(id) {
        return this.svc.findOne(id.toString());
    }
    update(id, dto) {
        return this.svc.update(id.toString(), dto);
    }
    linkStudents(id, dto) {
        return this.svc.linkStudents(id.toString(), dto.studentIds);
    }
    unlinkStudent(id, studentId) {
        return this.svc.unlinkStudent(id.toString(), studentId.toString());
    }
    remove(id) {
        return this.svc.remove(id.toString());
    }
};
exports.ParentsController = ParentsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parent_dto_1.CreateParentDto]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin, user_schema_1.Role.Teacher),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Parent),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('me/hijos'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Parent),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "getHijos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_parent_dto_1.UpdateParentDto]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/link'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, link_students_dto_1.LinkStudentsDto]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "linkStudents", null);
__decorate([
    (0, common_1.Delete)(':id/unlink/:studentId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "unlinkStudent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "remove", null);
exports.ParentsController = ParentsController = __decorate([
    (0, common_1.Controller)('parents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [parents_service_1.ParentsService])
], ParentsController);
//# sourceMappingURL=parents.controller.js.map