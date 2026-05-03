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
exports.ClassSectionsController = void 0;
const common_1 = require("@nestjs/common");
const class_sections_service_1 = require("./class-sections.service");
const create_class_section_dto_1 = require("./dto/create-class-section.dto");
const update_class_section_dto_1 = require("./dto/update-class-section.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const parse_object_id_pipe_1 = require("../common/pipes/parse-object-id.pipe");
const mongoose_1 = require("mongoose");
let ClassSectionsController = class ClassSectionsController {
    constructor(classSectionsService) {
        this.classSectionsService = classSectionsService;
    }
    findAll(query) {
        return this.classSectionsService.findAll(query);
    }
    findOne(id) {
        return this.classSectionsService.findOne(id.toString());
    }
    create(dto) {
        return this.classSectionsService.create(dto);
    }
    update(id, dto) {
        return this.classSectionsService.update(id.toString(), dto);
    }
    remove(id) {
        return this.classSectionsService.remove(id.toString());
    }
};
exports.ClassSectionsController = ClassSectionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClassSectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ClassSectionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_section_dto_1.CreateClassSectionDto]),
    __metadata("design:returntype", void 0)
], ClassSectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, update_class_section_dto_1.UpdateClassSectionDto]),
    __metadata("design:returntype", void 0)
], ClassSectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ClassSectionsController.prototype, "remove", null);
exports.ClassSectionsController = ClassSectionsController = __decorate([
    (0, common_1.Controller)('class-sections'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.Role.SuperAdmin, user_schema_1.Role.Admin),
    __metadata("design:paramtypes", [class_sections_service_1.ClassSectionsService])
], ClassSectionsController);
//# sourceMappingURL=class-sections.controller.js.map