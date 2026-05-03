"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dece_service_1 = require("./dece.service");
const dece_controller_1 = require("./dece.controller");
const dece_expediente_schema_1 = require("./schemas/dece-expediente.schema");
const dece_registro_schema_1 = require("./schemas/dece-registro.schema");
const students_module_1 = require("../students/students.module");
const notifications_module_1 = require("../notifications/notifications.module");
let DeceModule = class DeceModule {
};
exports.DeceModule = DeceModule;
exports.DeceModule = DeceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: dece_expediente_schema_1.DeceExpediente.name, schema: dece_expediente_schema_1.DeceExpedienteSchema },
                { name: dece_registro_schema_1.DeceRegistro.name, schema: dece_registro_schema_1.DeceRegistroSchema },
            ]),
            students_module_1.StudentsModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [dece_controller_1.DeceController],
        providers: [dece_service_1.DeceService],
    })
], DeceModule);
//# sourceMappingURL=dece.module.js.map