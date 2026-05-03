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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaEstudioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const area_estudio_schema_1 = require("./schemas/area-estudio.schema");
let AreaEstudioService = class AreaEstudioService {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.find().sort({ nombre: 1 }).exec();
    }
    async findOne(id) {
        const area = await this.model.findById(id);
        if (!area)
            throw new common_1.NotFoundException('Área de estudio no encontrada');
        return area;
    }
    async create(dto) {
        return new this.model(dto).save();
    }
    async update(id, dto) {
        const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Área de estudio no encontrada');
        return updated;
    }
    async remove(id) {
        const result = await this.model.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Área de estudio no encontrada');
    }
};
exports.AreaEstudioService = AreaEstudioService;
exports.AreaEstudioService = AreaEstudioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(area_estudio_schema_1.AreaEstudio.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AreaEstudioService);
//# sourceMappingURL=area-estudio.service.js.map