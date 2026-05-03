"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoLectivoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const curso_lectivo_service_1 = require("./curso-lectivo.service");
const curso_lectivo_controller_1 = require("./curso-lectivo.controller");
const curso_lectivo_schema_1 = require("./schemas/curso-lectivo.schema");
const teachers_module_1 = require("../teachers/teachers.module");
const enrollments_module_1 = require("../enrollments/enrollments.module");
let CursoLectivoModule = class CursoLectivoModule {
};
exports.CursoLectivoModule = CursoLectivoModule;
exports.CursoLectivoModule = CursoLectivoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: curso_lectivo_schema_1.CursoLectivo.name, schema: curso_lectivo_schema_1.CursoLectivoSchema }]),
            teachers_module_1.TeachersModule,
            enrollments_module_1.EnrollmentsModule,
        ],
        controllers: [curso_lectivo_controller_1.CursoLectivoController],
        providers: [curso_lectivo_service_1.CursoLectivoService],
        exports: [curso_lectivo_service_1.CursoLectivoService],
    })
], CursoLectivoModule);
//# sourceMappingURL=curso-lectivo.module.js.map