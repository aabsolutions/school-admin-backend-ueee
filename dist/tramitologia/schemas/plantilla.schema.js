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
exports.PlantillaSchema = exports.RequiredAttachmentSchema = exports.VariableConfigSchema = exports.Plantilla = exports.RequiredAttachment = exports.VariableConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let VariableConfig = class VariableConfig {
};
exports.VariableConfig = VariableConfig;
__decorate([
    (0, mongoose_1.Prop)({ required: true, uppercase: true }),
    __metadata("design:type", String)
], VariableConfig.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VariableConfig.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['text', 'textarea', 'select', 'date', 'number', 'email'], default: 'text' }),
    __metadata("design:type", String)
], VariableConfig.prototype, "fieldType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], VariableConfig.prototype, "required", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], VariableConfig.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VariableConfig.prototype, "defaultValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VariableConfig.prototype, "placeholder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], VariableConfig.prototype, "order", void 0);
exports.VariableConfig = VariableConfig = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], VariableConfig);
let RequiredAttachment = class RequiredAttachment {
};
exports.RequiredAttachment = RequiredAttachment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RequiredAttachment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], RequiredAttachment.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], RequiredAttachment.prototype, "required", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], RequiredAttachment.prototype, "allowedMimes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 10 * 1024 * 1024 }),
    __metadata("design:type", Number)
], RequiredAttachment.prototype, "maxSizeBytes", void 0);
exports.RequiredAttachment = RequiredAttachment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], RequiredAttachment);
let Plantilla = class Plantilla {
};
exports.Plantilla = Plantilla;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Plantilla.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Plantilla.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Plantilla.prototype, "categoria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: ['STUDENT', 'TEACHER', 'PARENT'], default: ['STUDENT', 'TEACHER', 'PARENT'] }),
    __metadata("design:type", Array)
], Plantilla.prototype, "solicitanteRoles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Plantilla.prototype, "bodyHtml", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [VariableConfig], default: [] }),
    __metadata("design:type", Array)
], Plantilla.prototype, "variables", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [RequiredAttachment], default: [] }),
    __metadata("design:type", Array)
], Plantilla.prototype, "requiredAttachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Plantilla.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Plantilla.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Plantilla.prototype, "createdBy", void 0);
exports.Plantilla = Plantilla = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Plantilla);
exports.VariableConfigSchema = mongoose_1.SchemaFactory.createForClass(VariableConfig);
exports.RequiredAttachmentSchema = mongoose_1.SchemaFactory.createForClass(RequiredAttachment);
exports.PlantillaSchema = mongoose_1.SchemaFactory.createForClass(Plantilla);
exports.PlantillaSchema.index({ isActive: 1, categoria: 1 });
exports.PlantillaSchema.index({ solicitanteRoles: 1, isActive: 1 });
//# sourceMappingURL=plantilla.schema.js.map