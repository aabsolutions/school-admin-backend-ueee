"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireTramiteRole = exports.TRAMITE_ROLE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.TRAMITE_ROLE_KEY = 'tramiteRoles';
const RequireTramiteRole = (...roles) => (0, common_1.SetMetadata)(exports.TRAMITE_ROLE_KEY, roles);
exports.RequireTramiteRole = RequireTramiteRole;
//# sourceMappingURL=tramite-role.decorator.js.map