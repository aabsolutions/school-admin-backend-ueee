"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleConfigModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_config_schema_1 = require("./schemas/role-config.schema");
const role_config_service_1 = require("./role-config.service");
const role_config_controller_1 = require("./role-config.controller");
let RoleConfigModule = class RoleConfigModule {
};
exports.RoleConfigModule = RoleConfigModule;
exports.RoleConfigModule = RoleConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: role_config_schema_1.RoleConfig.name, schema: role_config_schema_1.RoleConfigSchema }]),
        ],
        controllers: [role_config_controller_1.RoleConfigController],
        providers: [role_config_service_1.RoleConfigService],
        exports: [role_config_service_1.RoleConfigService],
    })
], RoleConfigModule);
//# sourceMappingURL=role-config.module.js.map