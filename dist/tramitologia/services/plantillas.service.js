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
exports.PlantillasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const plantilla_schema_1 = require("../schemas/plantilla.schema");
const variable_parser_service_1 = require("./variable-parser.service");
let PlantillasService = class PlantillasService {
    constructor(plantillaModel, varParser) {
        this.plantillaModel = plantillaModel;
        this.varParser = varParser;
    }
    async create(dto, userId) {
        const parsed = this.varParser.parse(dto.bodyHtml);
        const variables = dto.variables ?? this.varParser.mergeWithExistingConfig(parsed, []);
        return new this.plantillaModel({
            ...dto,
            variables,
            createdBy: new mongoose_2.Types.ObjectId(userId),
        }).save();
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
        const filter = { isActive: true };
        if (search)
            filter['$or'] = [
                { nombre: { $regex: search, $options: 'i' } },
                { categoria: { $regex: search, $options: 'i' } },
            ];
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.plantillaModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
            this.plantillaModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findAvailable(userRole) {
        return this.plantillaModel
            .find({ isActive: true, solicitanteRoles: userRole })
            .sort({ nombre: 1 })
            .lean()
            .exec();
    }
    async findOne(id) {
        const plantilla = await this.plantillaModel.findById(id).exec();
        if (!plantilla)
            throw new common_1.NotFoundException(`Plantilla ${id} no encontrada`);
        return plantilla;
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (dto.bodyHtml && dto.bodyHtml !== existing.bodyHtml) {
            const parsed = this.varParser.parse(dto.bodyHtml);
            dto.variables = this.varParser.mergeWithExistingConfig(parsed, existing.variables);
        }
        const updated = await this.plantillaModel
            .findByIdAndUpdate(id, { ...dto, $inc: { version: 1 } }, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Plantilla ${id} no encontrada`);
        return updated;
    }
    async softDelete(id) {
        await this.plantillaModel.findByIdAndUpdate(id, { isActive: false }).exec();
    }
};
exports.PlantillasService = PlantillasService;
exports.PlantillasService = PlantillasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(plantilla_schema_1.Plantilla.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        variable_parser_service_1.VariableParserService])
], PlantillasService);
//# sourceMappingURL=plantillas.service.js.map