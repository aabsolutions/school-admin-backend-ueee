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
exports.InstitucionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const institucion_schema_1 = require("./schemas/institucion.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let InstitucionService = class InstitucionService {
    constructor(model, cloudinaryService) {
        this.model = model;
        this.cloudinaryService = cloudinaryService;
    }
    async getInstitucion() {
        let doc = await this.model
            .findOne()
            .populate('autoridad', 'name email')
            .exec();
        if (!doc) {
            doc = await new this.model({}).save();
        }
        return doc;
    }
    async updateInstitucion(dto) {
        return this.model
            .findOneAndUpdate({}, { $set: dto }, { upsert: true, new: true })
            .populate('autoridad', 'name email')
            .exec();
    }
    async uploadLogo(file) {
        const url = await this.cloudinaryService.uploadBuffer(file.buffer, 'institucion/logo');
        return this.model
            .findOneAndUpdate({}, { $set: { logotipo: url } }, { upsert: true, new: true })
            .populate('autoridad', 'name email')
            .exec();
    }
};
exports.InstitucionService = InstitucionService;
exports.InstitucionService = InstitucionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(institucion_schema_1.Institucion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], InstitucionService);
//# sourceMappingURL=institucion.service.js.map