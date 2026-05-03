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
exports.DeceRegistroSchema = exports.DeceRegistro = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DeceRegistro = class DeceRegistro {
};
exports.DeceRegistro = DeceRegistro;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DeceExpediente', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DeceRegistro.prototype, "expedienteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: [
            'Seguimiento individual',
            'Entrevista familiar',
            'Crisis emocional',
            'Derivación externa',
            'Taller grupal',
            'Acompañamiento académico',
            'Otro',
        ],
    }),
    __metadata("design:type", String)
], DeceRegistro.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DeceRegistro.prototype, "fecha", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DeceRegistro.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DeceRegistro.prototype, "evidencias", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DeceRegistro.prototype, "creadoPor", void 0);
exports.DeceRegistro = DeceRegistro = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DeceRegistro);
exports.DeceRegistroSchema = mongoose_1.SchemaFactory.createForClass(DeceRegistro);
//# sourceMappingURL=dece-registro.schema.js.map