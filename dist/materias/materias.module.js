"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriasModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const materias_service_1 = require("./materias.service");
const materias_controller_1 = require("./materias.controller");
const materia_schema_1 = require("./schemas/materia.schema");
let MateriasModule = class MateriasModule {
};
exports.MateriasModule = MateriasModule;
exports.MateriasModule = MateriasModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: materia_schema_1.Materia.name, schema: materia_schema_1.MateriaSchema }])],
        controllers: [materias_controller_1.MateriasController],
        providers: [materias_service_1.MateriasService],
        exports: [materias_service_1.MateriasService, mongoose_1.MongooseModule],
    })
], MateriasModule);
//# sourceMappingURL=materias.module.js.map