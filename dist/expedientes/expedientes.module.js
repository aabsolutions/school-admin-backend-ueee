"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpedientesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const expedientes_service_1 = require("./expedientes.service");
const expedientes_controller_1 = require("./expedientes.controller");
const expediente_schema_1 = require("./schemas/expediente.schema");
const expediente_registro_schema_1 = require("./schemas/expediente-registro.schema");
const students_module_1 = require("../students/students.module");
const notifications_module_1 = require("../notifications/notifications.module");
let ExpedientesModule = class ExpedientesModule {
};
exports.ExpedientesModule = ExpedientesModule;
exports.ExpedientesModule = ExpedientesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: expediente_schema_1.Expediente.name, schema: expediente_schema_1.ExpedienteSchema },
                { name: expediente_registro_schema_1.ExpedienteRegistro.name, schema: expediente_registro_schema_1.ExpedienteRegistroSchema },
            ]),
            students_module_1.StudentsModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [expedientes_controller_1.ExpedientesController],
        providers: [expedientes_service_1.ExpedientesService],
    })
], ExpedientesModule);
//# sourceMappingURL=expedientes.module.js.map