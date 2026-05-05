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
exports.TramitesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_schema_1 = require("../../users/schemas/user.schema");
const tramite_role_guard_1 = require("../guards/tramite-role.guard");
const tramite_role_decorator_1 = require("../decorators/tramite-role.decorator");
const tramites_service_1 = require("../services/tramites.service");
const tramite_workflow_service_1 = require("../services/tramite-workflow.service");
const pdf_service_1 = require("../services/pdf.service");
const create_tramite_dto_1 = require("../dto/create-tramite.dto");
const transition_tramite_dto_1 = require("../dto/transition-tramite.dto");
const upload_attachment_dto_1 = require("../dto/upload-attachment.dto");
const tramite_query_dto_1 = require("../dto/tramite-query.dto");
const skip_transform_decorator_1 = require("../../common/decorators/skip-transform.decorator");
let TramitesController = class TramitesController {
    constructor(tramitesService, workflowService, pdfService) {
        this.tramitesService = tramitesService;
        this.workflowService = workflowService;
        this.pdfService = pdfService;
    }
    create(dto, req) {
        return this.tramitesService.create(dto, {
            id: req.user.id,
            role: req.user.role,
            name: req.user.name,
            username: req.user.username,
        });
    }
    addAttachment(id, dto, file, req) {
        if (!file)
            throw new common_1.BadRequestException('El archivo es requerido');
        return this.tramitesService.addAttachment(id, file, dto.name, req.user.id);
    }
    findMine(req, query) {
        return this.tramitesService.findMine(req.user.id, query);
    }
    findInbox(req, query) {
        return this.tramitesService.findInbox(req.user.id, query);
    }
    findOperatives() {
        return this.tramitesService.findOperatives();
    }
    findAll(query) {
        return this.tramitesService.findAll(query);
    }
    async findOne(id, req) {
        const tramite = await this.tramitesService.findById(id);
        const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
        if (!this.tramitesService.canAccess(tramite, user)) {
            throw new common_1.BadRequestException('Sin acceso a este trámite');
        }
        return tramite;
    }
    async getHistory(id, req) {
        const tramite = await this.tramitesService.findById(id);
        const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
        if (!this.tramitesService.canAccess(tramite, user)) {
            throw new common_1.BadRequestException('Sin acceso a este trámite');
        }
        return this.tramitesService.findHistory(id);
    }
    async getPdf(id, req, res) {
        const tramite = await this.tramitesService.findById(id);
        const user = { id: req.user.id, role: req.user.role, name: req.user.name, username: req.user.username };
        if (!this.tramitesService.canAccess(tramite, user)) {
            throw new common_1.BadRequestException('Sin acceso a este trámite');
        }
        const buffer = await this.pdfService.generatePdf(tramite.renderedHtml);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${tramite.codigo}.pdf"`);
        res.send(buffer);
    }
    transition(id, dto, req) {
        return this.workflowService.transitionState(id, dto.newState, {
            id: req.user.id,
            role: req.user.role,
            name: req.user.name,
        }, dto.observation);
    }
};
exports.TramitesController = TramitesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student, user_schema_1.Role.Teacher, user_schema_1.Role.Parent),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tramite_dto_1.CreateTramiteDto, Object]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 20 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_attachment_dto_1.UploadAttachmentDto, Object, Object]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "addAttachment", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student, user_schema_1.Role.Teacher, user_schema_1.Role.Parent),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tramite_query_dto_1.TramiteQueryDto]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)('inbox'),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_OPERATIVO'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tramite_query_dto_1.TramiteQueryDto]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "findInbox", null);
__decorate([
    (0, common_1.Get)('operatives'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "findOperatives", null);
__decorate([
    (0, common_1.Get)(),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tramite_query_dto_1.TramiteQueryDto]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TramitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TramitesController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    (0, skip_transform_decorator_1.SkipTransform)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TramitesController.prototype, "getPdf", null);
__decorate([
    (0, common_1.Patch)(':id/transition'),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN', 'TRAMITE_OPERATIVO'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transition_tramite_dto_1.TransitionTramiteDto, Object]),
    __metadata("design:returntype", void 0)
], TramitesController.prototype, "transition", null);
exports.TramitesController = TramitesController = __decorate([
    (0, common_1.Controller)('tramites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, tramite_role_guard_1.TramiteRoleGuard),
    __metadata("design:paramtypes", [tramites_service_1.TramitesService,
        tramite_workflow_service_1.TramiteWorkflowService,
        pdf_service_1.PdfService])
], TramitesController);
//# sourceMappingURL=tramites.controller.js.map