"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSITIONS = void 0;
exports.isValidTransition = isValidTransition;
const tramite_schema_1 = require("../schemas/tramite.schema");
exports.TRANSITIONS = {
    [tramite_schema_1.TramiteState.Pendiente]: [tramite_schema_1.TramiteState.EnProceso],
    [tramite_schema_1.TramiteState.EnProceso]: [tramite_schema_1.TramiteState.Aprobado, tramite_schema_1.TramiteState.Rechazado],
    [tramite_schema_1.TramiteState.Aprobado]: [tramite_schema_1.TramiteState.Finalizado],
    [tramite_schema_1.TramiteState.Rechazado]: [],
    [tramite_schema_1.TramiteState.Finalizado]: [],
};
function isValidTransition(from, to) {
    return exports.TRANSITIONS[from]?.includes(to) ?? false;
}
//# sourceMappingURL=state-machine.js.map