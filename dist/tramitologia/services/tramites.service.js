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
exports.TramitesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tramite_schema_1 = require("../schemas/tramite.schema");
const tramite_history_schema_1 = require("../schemas/tramite-history.schema");
const plantilla_schema_1 = require("../schemas/plantilla.schema");
const tramite_workflow_service_1 = require("./tramite-workflow.service");
const tramite_codigo_service_1 = require("./tramite-codigo.service");
const template_renderer_service_1 = require("./template-renderer.service");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let TramitesService = class TramitesService {
    constructor(tramiteModel, historyModel, plantillaModel, workflow, codigoService, renderer, cloudinary) {
        this.tramiteModel = tramiteModel;
        this.historyModel = historyModel;
        this.plantillaModel = plantillaModel;
        this.workflow = workflow;
        this.codigoService = codigoService;
        this.renderer = renderer;
        this.cloudinary = cloudinary;
    }
    async create(dto, user) {
        const plantilla = await this.plantillaModel.findById(dto.plantillaId).exec();
        if (!plantilla || !plantilla.isActive) {
            throw new common_1.NotFoundException(`Plantilla ${dto.plantillaId} no encontrada o inactiva`);
        }
        if (!plantilla.solicitanteRoles.includes(user.role)) {
            throw new common_1.ForbiddenException('Tu rol no puede solicitar esta plantilla');
        }
        const codigo = await this.codigoService.nextCodigo();
        const snapshot = {
            plantillaId: plantilla._id,
            nombre: plantilla.nombre,
            version: plantilla.version,
            bodyHtml: plantilla.bodyHtml,
            variables: plantilla.variables,
            requiredAttachments: plantilla.requiredAttachments,
        };
        const values = dto.values ?? [];
        const renderedHtml = this.renderer.render(snapshot, values, {
            fechaActual: new Date().toLocaleDateString('es-EC'),
            usuarioLogueado: user.name,
            idTramite: codigo,
        });
        const tramite = await new this.tramiteModel({
            codigo,
            plantilla: snapshot,
            solicitanteUserId: new mongoose_2.Types.ObjectId(user.id),
            solicitanteRole: user.role,
            operativoUserId: dto.operativoUserId ? new mongoose_2.Types.ObjectId(dto.operativoUserId) : undefined,
            values,
            renderedHtml,
            state: tramite_schema_1.TramiteState.Pendiente,
        }).save();
        await this.workflow.writeInitialHistory(tramite, { id: user.id, role: user.role, name: user.name });
        await this.workflow.emitCreationNotifications(tramite, dto.operativoUserId);
        return tramite;
    }
    async addAttachment(tramiteId, file, name, uploadedBy) {
        const tramite = await this.findById(tramiteId);
        const url = await this.cloudinary.uploadBuffer(file.buffer, 'tramitologia');
        await this.tramiteModel.findByIdAndUpdate(tramiteId, {
            $push: {
                attachments: {
                    name,
                    url,
                    mime: file.mimetype,
                    sizeBytes: file.size,
                    uploadedAt: new Date(),
                    uploadedBy: new mongoose_2.Types.ObjectId(uploadedBy),
                },
            },
        }).exec();
        return this.findById(tramiteId);
    }
    async findMine(userId, query) {
        return this.paginatedQuery({ solicitanteUserId: new mongoose_2.Types.ObjectId(userId) }, query);
    }
    async findInbox(operativoId, query) {
        return this.paginatedQuery({ operativoUserId: new mongoose_2.Types.ObjectId(operativoId) }, query);
    }
    async findAll(query) {
        return this.paginatedQuery({}, query);
    }
    async findById(id) {
        const tramite = await this.tramiteModel.findById(id).exec();
        if (!tramite)
            throw new common_1.NotFoundException(`Trámite ${id} no encontrado`);
        return tramite;
    }
    async findHistory(tramiteId) {
        return this.historyModel
            .find({ tramiteId: new mongoose_2.Types.ObjectId(tramiteId) })
            .sort({ createdAt: 1 })
            .populate('actorUserId', 'name username role')
            .lean()
            .exec();
    }
    async findOperatives() {
        const { User } = await Promise.resolve().then(() => require('../../users/schemas/user.schema'));
        return this.tramiteModel.db
            .collection('users')
            .find({ role: 'TRAMITE_OPERATIVO', isActive: true }, { projection: { password: 0 } })
            .toArray();
    }
    canAccess(tramite, user) {
        const isAdmin = ['ADMIN', 'SUPERADMIN', 'TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR'].includes(user.role);
        const isOwner = tramite.solicitanteUserId.toString() === user.id;
        const isOperativo = tramite.operativoUserId?.toString() === user.id;
        return isAdmin || isOwner || isOperativo;
    }
    async paginatedQuery(baseFilter, query) {
        const { page = 1, limit = 10, state, plantillaId, solicitanteUserId, dateFrom, dateTo, operativoUserId } = query;
        const filter = { ...baseFilter };
        if (state)
            filter['state'] = state;
        if (plantillaId)
            filter['plantilla.plantillaId'] = new mongoose_2.Types.ObjectId(plantillaId);
        if (solicitanteUserId)
            filter['solicitanteUserId'] = new mongoose_2.Types.ObjectId(solicitanteUserId);
        if (operativoUserId)
            filter['operativoUserId'] = new mongoose_2.Types.ObjectId(operativoUserId);
        if (dateFrom || dateTo) {
            filter['createdAt'] = {};
            if (dateFrom)
                filter['createdAt'].$gte = new Date(dateFrom);
            if (dateTo)
                filter['createdAt'].$lte = new Date(dateTo);
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.tramiteModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
            this.tramiteModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
};
exports.TramitesService = TramitesService;
exports.TramitesService = TramitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tramite_schema_1.Tramite.name)),
    __param(1, (0, mongoose_1.InjectModel)(tramite_history_schema_1.TramiteHistory.name)),
    __param(2, (0, mongoose_1.InjectModel)(plantilla_schema_1.Plantilla.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        tramite_workflow_service_1.TramiteWorkflowService,
        tramite_codigo_service_1.TramiteCodigoService,
        template_renderer_service_1.TemplateRendererService,
        cloudinary_service_1.CloudinaryService])
], TramitesService);
//# sourceMappingURL=tramites.service.js.map