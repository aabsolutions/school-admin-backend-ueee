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
exports.TramiteSchema = exports.DatosRepresentanteSchema = exports.Tramite = exports.TramiteAttachment = exports.FilledValue = exports.DatosRepresentante = exports.PlantillaSnapshot = exports.TramiteState = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const plantilla_schema_1 = require("./plantilla.schema");
var TramiteState;
(function (TramiteState) {
    TramiteState["Pendiente"] = "pendiente";
    TramiteState["EnProceso"] = "en_proceso";
    TramiteState["Aprobado"] = "aprobado";
    TramiteState["Rechazado"] = "rechazado";
    TramiteState["Finalizado"] = "finalizado";
})(TramiteState || (exports.TramiteState = TramiteState = {}));
let PlantillaSnapshot = class PlantillaSnapshot {
};
exports.PlantillaSnapshot = PlantillaSnapshot;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PlantillaSnapshot.prototype, "plantillaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PlantillaSnapshot.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], PlantillaSnapshot.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PlantillaSnapshot.prototype, "bodyHtml", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [plantilla_schema_1.VariableConfig], default: [] }),
    __metadata("design:type", Array)
], PlantillaSnapshot.prototype, "variables", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [plantilla_schema_1.RequiredAttachment], default: [] }),
    __metadata("design:type", Array)
], PlantillaSnapshot.prototype, "requiredAttachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PlantillaSnapshot.prototype, "plantillaRespuestaId", void 0);
exports.PlantillaSnapshot = PlantillaSnapshot = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PlantillaSnapshot);
let DatosRepresentante = class DatosRepresentante {
};
exports.DatosRepresentante = DatosRepresentante;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DatosRepresentante.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DatosRepresentante.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DatosRepresentante.prototype, "contacto", void 0);
exports.DatosRepresentante = DatosRepresentante = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DatosRepresentante);
let FilledValue = class FilledValue {
};
exports.FilledValue = FilledValue;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FilledValue.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], FilledValue.prototype, "value", void 0);
exports.FilledValue = FilledValue = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], FilledValue);
let TramiteAttachment = class TramiteAttachment {
};
exports.TramiteAttachment = TramiteAttachment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TramiteAttachment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TramiteAttachment.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TramiteAttachment.prototype, "mime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TramiteAttachment.prototype, "sizeBytes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], TramiteAttachment.prototype, "uploadedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TramiteAttachment.prototype, "uploadedBy", void 0);
exports.TramiteAttachment = TramiteAttachment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TramiteAttachment);
let Tramite = class Tramite {
};
exports.Tramite = Tramite;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Tramite.prototype, "codigo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: PlantillaSnapshot, required: true }),
    __metadata("design:type", PlantillaSnapshot)
], Tramite.prototype, "plantilla", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Tramite.prototype, "solicitanteUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tramite.prototype, "solicitanteRole", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Tramite.prototype, "operativoUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [FilledValue], default: [] }),
    __metadata("design:type", Array)
], Tramite.prototype, "values", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TramiteAttachment], default: [] }),
    __metadata("design:type", Array)
], Tramite.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Tramite.prototype, "renderedHtml", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(TramiteState),
        default: TramiteState.Pendiente,
    }),
    __metadata("design:type", String)
], Tramite.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tramite.prototype, "lastObservation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Tramite.prototype, "closedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DatosRepresentante }),
    __metadata("design:type", DatosRepresentante)
], Tramite.prototype, "datosRepresentante", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Tramite.prototype, "estudianteId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tramite.prototype, "cursoNombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [FilledValue], default: [] }),
    __metadata("design:type", Array)
], Tramite.prototype, "respuestaValues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Tramite.prototype, "respuestaRenderedHtml", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tramite.prototype, "solicitudMembreteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tramite.prototype, "respuestaMembreteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Tramite.prototype, "membreteConfig", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tramite.prototype, "respuestaBodyOverrideHtml", void 0);
exports.Tramite = Tramite = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Tramite);
exports.DatosRepresentanteSchema = mongoose_1.SchemaFactory.createForClass(DatosRepresentante);
exports.TramiteSchema = mongoose_1.SchemaFactory.createForClass(Tramite);
exports.TramiteSchema.index({ state: 1, createdAt: -1 });
exports.TramiteSchema.index({ operativoUserId: 1, state: 1 });
exports.TramiteSchema.index({ solicitanteUserId: 1, createdAt: -1 });
exports.TramiteSchema.index({ 'plantilla.plantillaId': 1, state: 1 });
//# sourceMappingURL=tramite.schema.js.map