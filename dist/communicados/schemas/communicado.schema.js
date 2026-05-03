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
exports.CommunicadoSchema = exports.Communicado = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Communicado = class Communicado {
};
exports.Communicado = Communicado;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Communicado.prototype, "teacherUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Communicado.prototype, "teacherName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Communicado.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Communicado.prototype, "studentName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Parent', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Communicado.prototype, "parentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Communicado.prototype, "parentUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 200 }),
    __metadata("design:type", String)
], Communicado.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 2000 }),
    __metadata("design:type", String)
], Communicado.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['sent', 'received'], default: 'sent' }),
    __metadata("design:type", String)
], Communicado.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Communicado.prototype, "receivedAt", void 0);
exports.Communicado = Communicado = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Communicado);
exports.CommunicadoSchema = mongoose_1.SchemaFactory.createForClass(Communicado);
exports.CommunicadoSchema.index({ parentId: 1, createdAt: -1 });
exports.CommunicadoSchema.index({ teacherUserId: 1, studentId: 1, createdAt: -1 });
//# sourceMappingURL=communicado.schema.js.map