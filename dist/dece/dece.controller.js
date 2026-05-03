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
exports.DeceController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dece_service_1 = require("./dece.service");
const create_dece_expediente_dto_1 = require("./dto/create-dece-expediente.dto");
const create_dece_registro_dto_1 = require("./dto/create-dece-registro.dto");
const update_dece_registro_dto_1 = require("./dto/update-dece-registro.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class DeleteEvidenciaDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteEvidenciaDto.prototype, "url", void 0);
const ALLOWED_MIME = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
let DeceController = class DeceController {
    constructor(svc, cloudinary) {
        this.svc = svc;
        this.cloudinary = cloudinary;
    }
    getMyExpediente(user) {
        return this.svc.findByUserIdWithRegistros(user.id);
    }
    findAll(query) { return this.svc.findAll(query); }
    getReporte(fechaDesde, fechaHasta, tipo, creadoPor, studentId) {
        return this.svc.getReporte({ fechaDesde, fechaHasta, tipo, creadoPor, studentId });
    }
    findByStudent(id) {
        return this.svc.findByStudent(id.toString());
    }
    findOne(id) {
        return this.svc.findOne(id.toString());
    }
    create(dto) { return this.svc.create(dto); }
    getOrCreate(id) {
        return this.svc.getOrCreate(id.toString());
    }
    remove(id) {
        return this.svc.remove(id.toString());
    }
    getRegistros(id) {
        return this.svc.getRegistros(id.toString());
    }
    async addRegistro(id, dto, files = []) {
        const evidencias = await Promise.all((files ?? []).map(f => this.cloudinary.uploadBuffer(f.buffer, 'dece')));
        return this.svc.addRegistro(id.toString(), dto, evidencias);
    }
    async updateRegistro(expId, regId, dto, files = []) {
        const newEvidencias = await Promise.all((files ?? []).map(f => this.cloudinary.uploadBuffer(f.buffer, 'dece')));
        return this.svc.updateRegistro(expId.toString(), regId.toString(), dto, newEvidencias);
    }
    deleteRegistro(expId, regId) {
        return this.svc.deleteRegistro(expId.toString(), regId.toString());
    }
    async deleteEvidencia(expId, regId, dto) {
        const updated = await this.svc.deleteEvidencia(expId.toString(), regId.toString(), dto.url);
        this.cloudinary.deleteByUrl(dto.url).catch(() => null);
        return updated;
    }
};
exports.DeceController = DeceController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "getMyExpediente", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('reporte'),
    __param(0, (0, common_1.Query)('fechaDesde')),
    __param(1, (0, common_1.Query)('fechaHasta')),
    __param(2, (0, common_1.Query)('tipo')),
    __param(3, (0, common_1.Query)('creadoPor')),
    __param(4, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "getReporte", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dece_expediente_dto_1.CreateDeceExpedienteDto]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('student/:studentId/get-or-create'),
    __param(0, (0, common_1.Param)('studentId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "getOrCreate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/registros'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "getRegistros", null);
__decorate([
    (0, common_1.Post)(':id/registros'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_MIME.includes(file.mimetype))
                return cb(new common_1.BadRequestException(`Tipo no permitido: ${file.mimetype}`), false);
            cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, create_dece_registro_dto_1.CreateDeceRegistroDto, Array]),
    __metadata("design:returntype", Promise)
], DeceController.prototype, "addRegistro", null);
__decorate([
    (0, common_1.Put)(':expedienteId/registros/:registroId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_MIME.includes(file.mimetype))
                return cb(new common_1.BadRequestException(`Tipo no permitido: ${file.mimetype}`), false);
            cb(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('registroId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, update_dece_registro_dto_1.UpdateDeceRegistroDto, Array]),
    __metadata("design:returntype", Promise)
], DeceController.prototype, "updateRegistro", null);
__decorate([
    (0, common_1.Delete)(':expedienteId/registros/:registroId'),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('registroId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DeceController.prototype, "deleteRegistro", null);
__decorate([
    (0, common_1.Delete)(':expedienteId/registros/:registroId/evidencias'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin),
    __param(0, (0, common_1.Param)('expedienteId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('registroId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, DeleteEvidenciaDto]),
    __metadata("design:returntype", Promise)
], DeceController.prototype, "deleteEvidencia", null);
exports.DeceController = DeceController = __decorate([
    (0, common_1.Controller)('dece'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [dece_service_1.DeceService,
        cloudinary_service_1.CloudinaryService])
], DeceController);
//# sourceMappingURL=dece.controller.js.map