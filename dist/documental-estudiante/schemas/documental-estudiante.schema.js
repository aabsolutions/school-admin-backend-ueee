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
exports.DocumentalEstudianteSchema = exports.DocumentalEstudiante = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DocumentalEstudiante = class DocumentalEstudiante {
};
exports.DocumentalEstudiante = DocumentalEstudiante;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student', required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DocumentalEstudiante.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta2do", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta3ro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta4to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta5to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta6to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta7mo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta8vo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta9no", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta10mo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta1roBach", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "boleta2doBach", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "copiaCedulaEstudiante", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "copiaCedulaRepresentante", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DocumentalEstudiante.prototype, "certificadoParticipacion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], DocumentalEstudiante.prototype, "notas", void 0);
exports.DocumentalEstudiante = DocumentalEstudiante = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DocumentalEstudiante);
exports.DocumentalEstudianteSchema = mongoose_1.SchemaFactory.createForClass(DocumentalEstudiante);
//# sourceMappingURL=documental-estudiante.schema.js.map