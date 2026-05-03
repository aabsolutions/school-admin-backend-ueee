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
exports.DocumentalDocenteSchema = exports.DocumentalDocente = exports.DocumentoItemSchema = exports.DocumentoItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DocumentoItem = class DocumentoItem {
};
exports.DocumentoItem = DocumentoItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DocumentoItem.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DocumentoItem.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['profesional', 'planificacion'] }),
    __metadata("design:type", String)
], DocumentoItem.prototype, "categoria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], DocumentoItem.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date() }),
    __metadata("design:type", Date)
], DocumentoItem.prototype, "fecha", void 0);
exports.DocumentoItem = DocumentoItem = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: false })
], DocumentoItem);
exports.DocumentoItemSchema = mongoose_1.SchemaFactory.createForClass(DocumentoItem);
let DocumentalDocente = class DocumentalDocente {
};
exports.DocumentalDocente = DocumentalDocente;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher', required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DocumentalDocente.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.DocumentoItemSchema], default: [] }),
    __metadata("design:type", Array)
], DocumentalDocente.prototype, "documentos", void 0);
exports.DocumentalDocente = DocumentalDocente = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DocumentalDocente);
exports.DocumentalDocenteSchema = mongoose_1.SchemaFactory.createForClass(DocumentalDocente);
//# sourceMappingURL=documental-docente.schema.js.map