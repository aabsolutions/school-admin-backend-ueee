"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitucionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const institucion_service_1 = require("./institucion.service");
const institucion_controller_1 = require("./institucion.controller");
const institucion_schema_1 = require("./schemas/institucion.schema");
let InstitucionModule = class InstitucionModule {
};
exports.InstitucionModule = InstitucionModule;
exports.InstitucionModule = InstitucionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: institucion_schema_1.Institucion.name, schema: institucion_schema_1.InstitucionSchema }]),
        ],
        controllers: [institucion_controller_1.InstitucionController],
        providers: [institucion_service_1.InstitucionService],
        exports: [institucion_service_1.InstitucionService],
    })
], InstitucionModule);
//# sourceMappingURL=institucion.module.js.map