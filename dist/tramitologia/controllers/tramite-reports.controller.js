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
exports.TramiteReportsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const tramite_role_guard_1 = require("../guards/tramite-role.guard");
const tramite_role_decorator_1 = require("../decorators/tramite-role.decorator");
const tramite_reports_service_1 = require("../services/tramite-reports.service");
const reports_query_dto_1 = require("../dto/reports-query.dto");
let TramiteReportsController = class TramiteReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getStats(query) {
        return this.reportsService.getStats(query);
    }
    getExport(query) {
        return this.reportsService.getExportList(query);
    }
};
exports.TramiteReportsController = TramiteReportsController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_query_dto_1.ReportsQueryDto]),
    __metadata("design:returntype", void 0)
], TramiteReportsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_query_dto_1.ReportsQueryDto]),
    __metadata("design:returntype", void 0)
], TramiteReportsController.prototype, "getExport", null);
exports.TramiteReportsController = TramiteReportsController = __decorate([
    (0, common_1.Controller)('tramites/reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, tramite_role_guard_1.TramiteRoleGuard),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'),
    __metadata("design:paramtypes", [tramite_reports_service_1.TramiteReportsService])
], TramiteReportsController);
//# sourceMappingURL=tramite-reports.controller.js.map