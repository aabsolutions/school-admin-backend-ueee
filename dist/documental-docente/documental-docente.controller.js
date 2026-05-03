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
exports.DocumentalDocenteController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const documental_docente_service_1 = require("./documental-docente.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const teachers_service_1 = require("../teachers/teachers.service");
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const ALLOWED_MIME = [
    'image/jpeg', 'image/png', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
class UploadDocumentoDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadDocumentoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['profesional', 'planificacion']),
    __metadata("design:type", String)
], UploadDocumentoDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadDocumentoDto.prototype, "descripcion", void 0);
let DocumentalDocenteController = class DocumentalDocenteController {
    constructor(svc, cloudinary, teachersService) {
        this.svc = svc;
        this.cloudinary = cloudinary;
        this.teachersService = teachersService;
    }
    findAll(query) {
        return this.svc.findAll(query);
    }
    getByTeacher(id) {
        return this.svc.getOrCreate(id.toString());
    }
    async uploadForTeacher(teacherId, dto, file) {
        if (!file)
            throw new common_1.BadRequestException('El archivo es requerido');
        const url = await this.cloudinary.uploadBuffer(file.buffer, 'documental-docente');
        return this.svc.addDocumento(teacherId.toString(), dto.nombre, dto.categoria, url, dto.descripcion);
    }
    async deleteForTeacher(teacherId, docId) {
        const { url, record } = await this.svc.deleteDocumento(teacherId.toString(), docId);
        this.cloudinary.deleteByUrl(url).catch(() => null);
        return record;
    }
    async getMe(user) {
        const teacher = await this.teachersService.findByUserId(user.id);
        return this.svc.getOrCreate(teacher._id.toString());
    }
    async uploadMe(user, dto, file) {
        if (!file)
            throw new common_1.BadRequestException('El archivo es requerido');
        const teacher = await this.teachersService.findByUserId(user.id);
        const url = await this.cloudinary.uploadBuffer(file.buffer, 'documental-docente');
        return this.svc.addDocumento(teacher._id.toString(), dto.nombre, dto.categoria, url, dto.descripcion);
    }
    async deleteMe(user, docId) {
        const teacher = await this.teachersService.findByUserId(user.id);
        const { url, record } = await this.svc.deleteDocumento(teacher._id.toString(), docId);
        this.cloudinary.deleteByUrl(url).catch(() => null);
        return record;
    }
};
exports.DocumentalDocenteController = DocumentalDocenteController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], DocumentalDocenteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Param)('teacherId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DocumentalDocenteController.prototype, "getByTeacher", null);
__decorate([
    (0, common_1.Post)('teacher/:teacherId/documentos'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_MIME.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('teacherId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, UploadDocumentoDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentalDocenteController.prototype, "uploadForTeacher", null);
__decorate([
    (0, common_1.Delete)('teacher/:teacherId/documentos/:docId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __param(0, (0, common_1.Param)('teacherId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], DocumentalDocenteController.prototype, "deleteForTeacher", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Teacher),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentalDocenteController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)('me/documentos'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Teacher),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_MIME.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UploadDocumentoDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentalDocenteController.prototype, "uploadMe", null);
__decorate([
    (0, common_1.Delete)('me/documentos/:docId'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Teacher),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DocumentalDocenteController.prototype, "deleteMe", null);
exports.DocumentalDocenteController = DocumentalDocenteController = __decorate([
    (0, common_1.Controller)('documental-docente'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [documental_docente_service_1.DocumentalDocenteService,
        cloudinary_service_1.CloudinaryService,
        teachers_service_1.TeachersService])
], DocumentalDocenteController);
//# sourceMappingURL=documental-docente.controller.js.map