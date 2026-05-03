"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentalDocenteModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const documental_docente_service_1 = require("./documental-docente.service");
const documental_docente_controller_1 = require("./documental-docente.controller");
const documental_docente_schema_1 = require("./schemas/documental-docente.schema");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const teachers_module_1 = require("../teachers/teachers.module");
let DocumentalDocenteModule = class DocumentalDocenteModule {
};
exports.DocumentalDocenteModule = DocumentalDocenteModule;
exports.DocumentalDocenteModule = DocumentalDocenteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: documental_docente_schema_1.DocumentalDocente.name, schema: documental_docente_schema_1.DocumentalDocenteSchema },
            ]),
            cloudinary_module_1.CloudinaryModule,
            teachers_module_1.TeachersModule,
        ],
        controllers: [documental_docente_controller_1.DocumentalDocenteController],
        providers: [documental_docente_service_1.DocumentalDocenteService],
    })
], DocumentalDocenteModule);
//# sourceMappingURL=documental-docente.module.js.map