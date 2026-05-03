"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenciasModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const asistencias_service_1 = require("./asistencias.service");
const asistencias_controller_1 = require("./asistencias.controller");
const attendance_assignment_schema_1 = require("./schemas/attendance-assignment.schema");
const attendance_record_schema_1 = require("./schemas/attendance-record.schema");
const curso_lectivo_schema_1 = require("../curso-lectivo/schemas/curso-lectivo.schema");
const enrollment_schema_1 = require("../enrollments/schemas/enrollment.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const communicados_module_1 = require("../communicados/communicados.module");
let AsistenciasModule = class AsistenciasModule {
};
exports.AsistenciasModule = AsistenciasModule;
exports.AsistenciasModule = AsistenciasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: attendance_assignment_schema_1.AttendanceAssignment.name, schema: attendance_assignment_schema_1.AttendanceAssignmentSchema },
                { name: attendance_record_schema_1.AttendanceRecord.name, schema: attendance_record_schema_1.AttendanceRecordSchema },
                { name: curso_lectivo_schema_1.CursoLectivo.name, schema: curso_lectivo_schema_1.CursoLectivoSchema },
                { name: enrollment_schema_1.Enrollment.name, schema: enrollment_schema_1.EnrollmentSchema },
                { name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema },
            ]),
            communicados_module_1.CommunicadosModule,
        ],
        controllers: [asistencias_controller_1.AsistenciasController],
        providers: [asistencias_service_1.AsistenciasService],
        exports: [asistencias_service_1.AsistenciasService],
    })
], AsistenciasModule);
//# sourceMappingURL=asistencias.module.js.map