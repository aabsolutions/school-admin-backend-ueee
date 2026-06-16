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
exports.ExpedienteAcademicoDocumentoSchema = exports.ExpedienteAcademicoDocumento = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ExpedienteAcademicoDocumento = class ExpedienteAcademicoDocumento {
};
exports.ExpedienteAcademicoDocumento = ExpedienteAcademicoDocumento;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ExpedienteAcademico', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ExpedienteAcademicoDocumento.prototype, "expedienteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], ExpedienteAcademicoDocumento.prototype, "seccion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], ExpedienteAcademicoDocumento.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], ExpedienteAcademicoDocumento.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], ExpedienteAcademicoDocumento.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], ExpedienteAcademicoDocumento.prototype, "creadoPor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ExpedienteAcademicoDocumento.prototype, "fecha", void 0);
exports.ExpedienteAcademicoDocumento = ExpedienteAcademicoDocumento = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ExpedienteAcademicoDocumento);
exports.ExpedienteAcademicoDocumentoSchema = mongoose_1.SchemaFactory.createForClass(ExpedienteAcademicoDocumento);
//# sourceMappingURL=expediente-academico-documento.schema.js.map