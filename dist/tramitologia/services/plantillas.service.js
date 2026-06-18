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
        if (dto.plantillaRespuestaId)
            await this.validateRespuesta(dto.plantillaRespuestaId);
        const parsed = this.varParser.parse(dto.bodyHtml);
        const variables = dto.variables ?? this.varParser.mergeWithExistingConfig(parsed, []);
        const isRespuesta = dto.tipo === 'respuesta';
        return new this.plantillaModel({
            ...dto,
            tipo: dto.tipo ?? 'solicitud',
            solicitanteRoles: isRespuesta ? [] : (dto.solicitanteRoles ?? ['STUDENT', 'TEACHER', 'PARENT']),
            variables,
            createdBy: new mongoose_2.Types.ObjectId(userId),
            ...(dto.plantillaRespuestaId ? { plantillaRespuestaId: new mongoose_2.Types.ObjectId(dto.plantillaRespuestaId) } : {}),
        }).save();
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, tipo } = query;
        const filter = { isActive: true };
        if (search)
            filter['$or'] = [
                { nombre: { $regex: search, $options: 'i' } },
                { categoria: { $regex: search, $options: 'i' } },
            ];
        if (tipo)
            filter['tipo'] = tipo;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.plantillaModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
            this.plantillaModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findAvailable(userRole) {
        return this.plantillaModel
            .find({ isActive: true, tipo: { $ne: 'respuesta' }, solicitanteRoles: userRole })
            .sort({ nombre: 1 })
            .lean()
            .exec();
    }
    async findOne(id) {
        const plantilla = await this.plantillaModel
            .findById(id)
            .populate('plantillaRespuestaId', 'nombre _id variables bodyHtml isActive')
            .exec();
        if (!plantilla)
            throw new common_1.NotFoundException(`Plantilla ${id} no encontrada`);
        return plantilla;
    }
    async update(id, dto) {
        if (dto.plantillaRespuestaId) {
            if (dto.plantillaRespuestaId === id)
                throw new common_1.BadRequestException('Una plantilla no puede referenciarse a sí misma como respuesta');
            await this.validateRespuesta(dto.plantillaRespuestaId);
        }
        const existing = await this.plantillaModel.findById(id).exec();
        if (!existing)
            throw new common_1.NotFoundException(`Plantilla ${id} no encontrada`);
        if (dto.bodyHtml && dto.bodyHtml !== existing.bodyHtml) {
            const parsed = this.varParser.parse(dto.bodyHtml);
            dto.variables = this.varParser.mergeWithExistingConfig(parsed, existing.variables);
        }
        const resolvedTipo = dto.tipo ?? existing.tipo;
        const updatePayload = {
            ...dto,
            $inc: { version: 1 },
            ...(resolvedTipo === 'respuesta' ? { solicitanteRoles: [] } : {}),
        };
        if (dto.plantillaRespuestaId) {
            updatePayload.plantillaRespuestaId = new mongoose_2.Types.ObjectId(dto.plantillaRespuestaId);
        }
        else if ('plantillaRespuestaId' in dto && !dto.plantillaRespuestaId) {
            updatePayload.$unset = { plantillaRespuestaId: '' };
            delete updatePayload.plantillaRespuestaId;
        }
        const updated = await this.plantillaModel
            .findByIdAndUpdate(id, updatePayload, { returnDocument: 'after' })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Plantilla ${id} no encontrada`);
        return updated;
    }
    async validateRespuesta(plantillaRespuestaId) {
        const exists = await this.plantillaModel.findOne({ _id: new mongoose_2.Types.ObjectId(plantillaRespuestaId), isActive: true }).lean().exec();
        if (!exists)
            throw new common_1.BadRequestException(`Plantilla de respuesta ${plantillaRespuestaId} no encontrada o inactiva`);
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