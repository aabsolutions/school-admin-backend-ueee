"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpedienteAcademicoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const expediente_academico_service_1 = require("./expediente-academico.service");
const expediente_academico_controller_1 = require("./expediente-academico.controller");
const expediente_academico_schema_1 = require("./schemas/expediente-academico.schema");
const expediente_academico_documento_schema_1 = require("./schemas/expediente-academico-documento.schema");
const students_module_1 = require("../students/students.module");
const parents_module_1 = require("../parents/parents.module");
const student_schema_1 = require("../students/schemas/student.schema");
let ExpedienteAcademicoModule = class ExpedienteAcademicoModule {
};
exports.ExpedienteAcademicoModule = ExpedienteAcademicoModule;
exports.ExpedienteAcademicoModule = ExpedienteAcademicoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: expediente_academico_schema_1.ExpedienteAcademico.name, schema: expediente_academico_schema_1.ExpedienteAcademicoSchema },
                { name: expediente_academico_documento_schema_1.ExpedienteAcademicoDocumento.name, schema: expediente_academico_documento_schema_1.ExpedienteAcademicoDocumentoSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
            ]),
            students_module_1.StudentsModule,
            parents_module_1.ParentsModule,
        ],
        controllers: [expediente_academico_controller_1.ExpedienteAcademicoController],
        providers: [expediente_academico_service_1.ExpedienteAcademicoService],
    })
], ExpedienteAcademicoModule);
//# sourceMappingURL=expediente-academico.module.js.map