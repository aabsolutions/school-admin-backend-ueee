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
exports.ExpedienteAcademicoController = void 0;
const common_1 = require("@nestjs/common");
const expediente_academico_service_1 = require("./expediente-academico.service");
const create_expediente_academico_documento_dto_1 = require("./dto/create-expediente-academico-documento.dto");
const update_expediente_academico_documento_dto_1 = require("./dto/update-expediente-academico-documento.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const mongoose_1 = require("mongoose");
let ExpedienteAcademicoController = class ExpedienteAcademicoController {
    constructor(svc) {
        this.svc = svc;
    }
    getMyExpediente(user) {
        return this.svc.findMyExpediente(user.id);
    }
    getHijoExpediente(studentId, user) {
        return this.svc.findHijoExpediente(user.id, studentId.toString());
    }
    findAll(query) {
        return this.svc.findAll(query);
    }
    getSecciones() {
        return this.svc.getSeccionesGlobales();
    }
    getSeccionesStats() {
        return this.svc.getSeccionesStats();
    }
    deleteSeccionGlobal(seccionName) {
        return this.svc.deleteSeccionGlobal(seccionName);
    }
    findByStudent(id) {
        return this.svc.findByStudent(id.toString());
    }
    getOrCreate(id) {
        return this.svc.getOrCreate(id.toString());
    }
    getDocumentos(id) {
        return this.svc.getDocumentos(id.toString());
    }
    addDocumento(id, dto) {
        return this.svc.addDocumento(id.toString(), dto);
    }
    updateDocumento(expId, docId, dto) {
        return this.svc.updateDocumento(expId.toString(), docId.toString(), dto);
    }
    deleteDocumento(expId, docId) {
        return this.svc.deleteDocumento(expId.toString(), docId.toString());
    }
    deleteSeccion(expId, seccionName) {
        return this.svc.deleteSeccion(expId.toString(), seccionName);
    }
    deleteExpediente(id) {
        return this.svc.deleteExpediente(id.toString());
    }
};
exports.ExpedienteAcademicoController = ExpedienteAcademicoController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getMyExpediente", null);
__decorate([
    (0, common_1.Get)('parent/hijo/:studentId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Parent),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getHijoExpediente", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('secciones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getSecciones", null);
__decorate([
    (0, common_1.Get)('secciones/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getSeccionesStats", null);
__decorate([
    (0, common_1.Delete)('secciones/:seccionName'),
    __param(0, (0, common_1.Param)('seccionName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "deleteSeccionGlobal", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Post)('student/:studentId/get-or-create'),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getOrCreate", null);
__decorate([
    (0, common_1.Get)(':id/documentos'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "getDocumentos", null);
__decorate([
    (0, common_1.Post)(':id/documentos'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, create_expediente_academico_documento_dto_1.CreateExpedienteAcademicoDocumentoDto]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "addDocumento", null);
__decorate([
    (0, common_1.Put)(':expedienteId/documentos/:docId'),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('docId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, update_expediente_academico_documento_dto_1.UpdateExpedienteAcademicoDocumentoDto]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "updateDocumento", null);
__decorate([
    (0, common_1.Delete)(':expedienteId/documentos/:docId'),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('docId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "deleteDocumento", null);
__decorate([
    (0, common_1.Delete)(':expedienteId/secciones/:seccionName'),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('seccionName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "deleteSeccion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ExpedienteAcademicoController.prototype, "deleteExpediente", null);
exports.ExpedienteAcademicoController = ExpedienteAcademicoController = __decorate([
    (0, common_1.Controller)('expediente-academico'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [expediente_academico_service_1.ExpedienteAcademicoService])
], ExpedienteAcademicoController);
//# sourceMappingURL=expediente-academico.controller.js.map