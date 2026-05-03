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
exports.CursoLectivoController = void 0;
const common_1 = require("@nestjs/common");
const curso_lectivo_service_1 = require("./curso-lectivo.service");
const create_curso_lectivo_dto_1 = require("./dto/create-curso-lectivo.dto");
const update_curso_lectivo_dto_1 = require("./dto/update-curso-lectivo.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const mongoose_1 = require("mongoose");
let CursoLectivoController = class CursoLectivoController {
    constructor(cursoLectivoService) {
        this.cursoLectivoService = cursoLectivoService;
    }
    getMiTutorAlumnos(user) {
        return this.cursoLectivoService.findTutorAlumnos(user.id);
    }
    findAll(query) {
        return this.cursoLectivoService.findAll(query);
    }
    findOne(id) {
        return this.cursoLectivoService.findOne(id.toString());
    }
    create(dto) {
        return this.cursoLectivoService.create(dto);
    }
    update(id, dto) {
        return this.cursoLectivoService.update(id.toString(), dto);
    }
    remove(id) {
        return this.cursoLectivoService.remove(id.toString());
    }
};
exports.CursoLectivoController = CursoLectivoController;
__decorate([
    (0, common_1.Get)('mi-tutor-alumnos'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Teacher),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "getMiTutorAlumnos", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_curso_lectivo_dto_1.CreateCursoLectivoDto]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_curso_lectivo_dto_1.UpdateCursoLectivoDto]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CursoLectivoController.prototype, "remove", null);
exports.CursoLectivoController = CursoLectivoController = __decorate([
    (0, common_1.Controller)('curso-lectivo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [curso_lectivo_service_1.CursoLectivoService])
], CursoLectivoController);
//# sourceMappingURL=curso-lectivo.controller.js.map