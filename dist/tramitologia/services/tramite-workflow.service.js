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
exports.TramiteWorkflowService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tramite_schema_1 = require("../schemas/tramite.schema");
const tramite_history_schema_1 = require("../schemas/tramite-history.schema");
const notifications_service_1 = require("../../notifications/notifications.service");
const state_machine_1 = require("../constants/state-machine");
const TERMINAL_STATES = [tramite_schema_1.TramiteState.Rechazado, tramite_schema_1.TramiteState.Finalizado];
const TRANSITION_ACTORS = new Set(['TRAMITE_ADMIN', 'TRAMITE_OPERATIVO', 'ADMIN', 'SUPERADMIN']);
let TramiteWorkflowService = class TramiteWorkflowService {
    constructor(tramiteModel, historyModel, notifications) {
        this.tramiteModel = tramiteModel;
        this.historyModel = historyModel;
        this.notifications = notifications;
    }
    async transitionState(tramiteId, newState, actor, observation) {
        const tramite = await this.tramiteModel.findById(tramiteId).exec();
        if (!tramite)
            throw new common_1.NotFoundException(`Trámite ${tramiteId} no encontrado`);
        if (!(0, state_machine_1.isValidTransition)(tramite.state, newState)) {
            throw new common_1.BadRequestException(`Transición inválida: ${tramite.state} → ${newState}`);
        }
        const isAdmin = actor.role === 'SUPERADMIN' || actor.role === 'ADMIN' || actor.role === 'TRAMITE_ADMIN';
        const isAssignedOperativo = actor.role === 'TRAMITE_OPERATIVO' &&
            tramite.operativoUserId?.toString() === actor.id;
        if (!isAdmin && !isAssignedOperativo) {
            throw new common_1.ForbiddenException('No tenés permisos para cambiar el estado de este trámite');
        }
        if (newState === tramite_schema_1.TramiteState.Rechazado && !observation?.trim()) {
            throw new common_1.BadRequestException('La observación es obligatoria al rechazar un trámite');
        }
        const fromState = tramite.state;
        const isTerminal = TERMINAL_STATES.includes(newState);
        await this.tramiteModel.findByIdAndUpdate(tramiteId, {
            state: newState,
            ...(observation ? { lastObservation: observation } : {}),
            ...(isTerminal ? { closedAt: new Date() } : {}),
        }).exec();
        await this.historyModel.create({
            tramiteId: new mongoose_2.Types.ObjectId(tramiteId),
            fromState,
            toState: newState,
            actorUserId: new mongoose_2.Types.ObjectId(actor.id),
            actorRole: actor.role,
            observation: observation ?? '',
        });
        const updated = await this.tramiteModel.findById(tramiteId).exec();
        if (!updated)
            throw new common_1.NotFoundException(`Trámite ${tramiteId} no encontrado`);
        await this.emitTransitionNotifications(updated, fromState, newState, actor, observation);
        return updated;
    }
    async writeInitialHistory(tramite, actor) {
        await this.historyModel.create({
            tramiteId: tramite._id,
            fromState: 'created',
            toState: tramite_schema_1.TramiteState.Pendiente,
            actorUserId: new mongoose_2.Types.ObjectId(actor.id),
            actorRole: actor.role,
            observation: '',
        });
    }
    async emitTransitionNotifications(tramite, fromState, newState, actor, observation) {
        const solicitanteId = tramite.solicitanteUserId.toString();
        const operativoId = tramite.operativoUserId?.toString();
        const codigo = tramite.codigo;
        const plantillaNombre = tramite.plantilla.nombre;
        const notifs = [];
        const solicitantePortal = this.portalForRole(tramite.solicitanteRole);
        const tramiteLink = (portal) => `/${portal}/tramitologia/detalle/${tramite._id}`;
        switch (newState) {
            case tramite_schema_1.TramiteState.EnProceso:
                notifs.push({
                    recipientId: solicitanteId,
                    title: 'Trámite en proceso',
                    body: `${codigo} fue tomado por ${actor.name}`,
                    link: tramiteLink(solicitantePortal),
                });
                break;
            case tramite_schema_1.TramiteState.Aprobado:
                notifs.push({
                    recipientId: solicitanteId,
                    title: 'Trámite aprobado',
                    body: observation ?? `${plantillaNombre} — ${codigo}`,
                    link: tramiteLink(solicitantePortal),
                });
                break;
            case tramite_schema_1.TramiteState.Rechazado:
                notifs.push({
                    recipientId: solicitanteId,
                    title: 'Trámite rechazado',
                    body: observation ?? '',
                    link: tramiteLink(solicitantePortal),
                });
                break;
            case tramite_schema_1.TramiteState.Finalizado:
                notifs.push({
                    recipientId: solicitanteId,
                    title: 'Trámite finalizado',
                    body: 'Disponible para descarga PDF',
                    link: tramiteLink(solicitantePortal),
                });
                break;
        }
        if (operativoId && operativoId !== actor.id) {
            notifs.push({
                recipientId: operativoId,
                title: 'Trámite actualizado',
                body: `${codigo} — ${plantillaNombre} pasó a estado ${newState}`,
                link: tramiteLink('admin'),
            });
        }
        await Promise.all(notifs.map((n) => this.notifications.create(n.recipientId, 'tramitologia', n.title, n.body, n.link).catch(() => null)));
    }
    async emitCreationNotifications(tramite, operativoId) {
        const solicitanteId = tramite.solicitanteUserId.toString();
        const codigo = tramite.codigo;
        const plantillaNombre = tramite.plantilla.nombre;
        const solicitantePortal = this.portalForRole(tramite.solicitanteRole);
        await this.notifications.create(solicitanteId, 'tramitologia', 'Trámite recibido', `${plantillaNombre} — ${codigo}`, `/${solicitantePortal}/tramitologia/detalle/${tramite._id}`).catch(() => null);
        if (operativoId) {
            await this.notifications.create(operativoId, 'tramitologia', 'Nuevo trámite asignado', `${plantillaNombre} — ${codigo}`, `/admin/tramitologia/detalle/${tramite._id}`).catch(() => null);
        }
    }
    portalForRole(role) {
        const map = {
            STUDENT: 'student',
            TEACHER: 'teacher',
            PARENT: 'parent',
        };
        return map[role] ?? 'admin';
    }
};
exports.TramiteWorkflowService = TramiteWorkflowService;
exports.TramiteWorkflowService = TramiteWorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tramite_schema_1.Tramite.name)),
    __param(1, (0, mongoose_1.InjectModel)(tramite_history_schema_1.TramiteHistory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notifications_service_1.NotificationsService])
], TramiteWorkflowService);
//# sourceMappingURL=tramite-workflow.service.js.map