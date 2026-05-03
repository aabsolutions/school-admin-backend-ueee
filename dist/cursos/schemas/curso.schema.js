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
exports.CursoSchema = exports.Curso = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Curso = class Curso {
};
exports.Curso = Curso;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['8VO', '9NO', '10MO', '1RO BACH', '2DO BACH', '3RO BACH'] }),
    __metadata("design:type", String)
], Curso.prototype, "nivel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Curso.prototype, "especialidad", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, uppercase: true }),
    __metadata("design:type", String)
], Curso.prototype, "paralelo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['Matutina', 'Vespertina', 'Nocturna'] }),
    __metadata("design:type", String)
], Curso.prototype, "jornada", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['EGB Superior', 'Bachillerato General', 'Bachillerato Tecnico'] }),
    __metadata("design:type", String)
], Curso.prototype, "subnivel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], Curso.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Materia' }], default: [] }),
    __metadata("design:type", Array)
], Curso.prototype, "materias", void 0);
exports.Curso = Curso = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Curso);
exports.CursoSchema = mongoose_1.SchemaFactory.createForClass(Curso);
exports.CursoSchema.index({ nivel: 1, especialidad: 1, paralelo: 1, jornada: 1, subnivel: 1 }, { unique: true });
//# sourceMappingURL=curso.schema.js.map