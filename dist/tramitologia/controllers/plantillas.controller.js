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
exports.PlantillasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_schema_1 = require("../../users/schemas/user.schema");
const tramite_role_guard_1 = require("../guards/tramite-role.guard");
const tramite_role_decorator_1 = require("../decorators/tramite-role.decorator");
const plantillas_service_1 = require("../services/plantillas.service");
const variable_parser_service_1 = require("../services/variable-parser.service");
const create_plantilla_dto_1 = require("../dto/create-plantilla.dto");
const update_plantilla_dto_1 = require("../dto/update-plantilla.dto");
const parse_variables_dto_1 = require("../dto/parse-variables.dto");
const pagination_query_dto_1 = require("../../common/dto/pagination-query.dto");
let PlantillasController = class PlantillasController {
    constructor(plantillasService, varParser) {
        this.plantillasService = plantillasService;
        this.varParser = varParser;
    }
    create(dto, req) {
        return this.plantillasService.create(dto, req.user.id);
    }
    findAll(query) {
        return this.plantillasService.findAll(query);
    }
    findAvailable(req) {
        return this.plantillasService.findAvailable(req.user.role);
    }
    parseVariables(dto) {
        return this.varParser.parse(dto.bodyHtml);
    }
    findOne(id) {
        return this.plantillasService.findOne(id);
    }
    update(id, dto) {
        return this.plantillasService.update(id, dto);
    }
    remove(id) {
        return this.plantillasService.softDelete(id);
    }
};
exports.PlantillasController = PlantillasController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plantilla_dto_1.CreatePlantillaDto, Object]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Student, user_schema_1.Role.Teacher, user_schema_1.Role.Parent),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Post)('parse-variables'),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parse_variables_dto_1.ParseVariablesDto]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "parseVariables", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_plantilla_dto_1.UpdatePlantillaDto]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.Admin, user_schema_1.Role.SuperAdmin),
    (0, tramite_role_decorator_1.RequireTramiteRole)('TRAMITE_ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "remove", null);
exports.PlantillasController = PlantillasController = __decorate([
    (0, common_1.Controller)('plantillas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, tramite_role_guard_1.TramiteRoleGuard),
    __metadata("design:paramtypes", [plantillas_service_1.PlantillasService,
        variable_parser_service_1.VariableParserService])
], PlantillasController);
//# sourceMappingURL=plantillas.controller.js.map