"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargaHorariaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const carga_horaria_service_1 = require("./carga-horaria.service");
const carga_horaria_controller_1 = require("./carga-horaria.controller");
const carga_horaria_schema_1 = require("./schemas/carga-horaria.schema");
let CargaHorariaModule = class CargaHorariaModule {
};
exports.CargaHorariaModule = CargaHorariaModule;
exports.CargaHorariaModule = CargaHorariaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: carga_horaria_schema_1.CargaHoraria.name, schema: carga_horaria_schema_1.CargaHorariaSchema }]),
        ],
        controllers: [carga_horaria_controller_1.CargaHorariaController],
        providers: [carga_horaria_service_1.CargaHorariaService],
        exports: [carga_horaria_service_1.CargaHorariaService],
    })
], CargaHorariaModule);
//# sourceMappingURL=carga-horaria.module.js.map