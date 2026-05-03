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
exports.CargaHorariaController = void 0;
const common_1 = require("@nestjs/common");
const carga_horaria_service_1 = require("./carga-horaria.service");
const set_asignacion_dto_1 = require("./dto/set-asignacion.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const mongoose_1 = require("mongoose");
let CargaHorariaController = class CargaHorariaController {
    constructor(service) {
        this.service = service;
    }
    findByCursoLectivo(id) {
        return this.service.findByCursoLectivo(id.toString());
    }
    getDisponibles(id, docenteId) {
        return this.service.getDisponibles(id.toString(), docenteId);
    }
    findByDocente(docenteId) {
        return this.service.findByDocente(docenteId.toString());
    }
    findMateriasByEstudiante(estudianteId) {
        return this.service.findMateriasByEstudiante(estudianteId.toString());
    }
    setAsignacion(id, docenteId, dto) {
        return this.service.setAsignacion(id.toString(), docenteId.toString(), dto);
    }
};
exports.CargaHorariaController = CargaHorariaController;
__decorate([
    (0, common_1.Get)('curso-lectivo/:id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CargaHorariaController.prototype, "findByCursoLectivo", null);
__decorate([
    (0, common_1.Get)('curso-lectivo/:id/disponibles'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('docenteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", void 0)
], CargaHorariaController.prototype, "getDisponibles", null);
__decorate([
    (0, common_1.Get)('docente/:docenteId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Teacher),
    __param(0, (0, common_1.Param)('docenteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CargaHorariaController.prototype, "findByDocente", null);
__decorate([
    (0, common_1.Get)('estudiante/:estudianteId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, common_1.Param)('estudianteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CargaHorariaController.prototype, "findMateriasByEstudiante", null);
__decorate([
    (0, common_1.Put)('curso-lectivo/:id/docente/:docenteId'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('docenteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, set_asignacion_dto_1.SetAsignacionDto]),
    __metadata("design:returntype", void 0)
], CargaHorariaController.prototype, "setAsignacion", null);
exports.CargaHorariaController = CargaHorariaController = __decorate([
    (0, common_1.Controller)('carga-horaria'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [carga_horaria_service_1.CargaHorariaService])
], CargaHorariaController);
//# sourceMappingURL=carga-horaria.controller.js.map