"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicadosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const communicados_service_1 = require("./communicados.service");
const communicados_controller_1 = require("./communicados.controller");
const communicado_schema_1 = require("./schemas/communicado.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const notifications_module_1 = require("../notifications/notifications.module");
let CommunicadosModule = class CommunicadosModule {
};
exports.CommunicadosModule = CommunicadosModule;
exports.CommunicadosModule = CommunicadosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: communicado_schema_1.Communicado.name, schema: communicado_schema_1.CommunicadoSchema },
                { name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            notifications_module_1.NotificationsModule,
        ],
        controllers: [communicados_controller_1.CommunicadosController],
        providers: [communicados_service_1.CommunicadosService],
        exports: [communicados_service_1.CommunicadosService],
    })
], CommunicadosModule);
//# sourceMappingURL=communicados.module.js.map