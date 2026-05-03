"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleConfigSchema = exports.RoleConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RoleConfig = class RoleConfig {
};
exports.RoleConfig = RoleConfig;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], RoleConfig.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], RoleConfig.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], RoleConfig.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoleConfig.prototype, "isSystem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], RoleConfig.prototype, "sidebarPermissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 10 }),
    __metadata("design:type", Number)
], RoleConfig.prototype, "priority", void 0);
exports.RoleConfig = RoleConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RoleConfig);
exports.RoleConfigSchema = mongoose_1.SchemaFactory.createForClass(RoleConfig);
//# sourceMappingURL=role-config.schema.js.map