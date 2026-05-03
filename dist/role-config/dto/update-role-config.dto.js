"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleConfigDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_role_config_dto_1 = require("./create-role-config.dto");
class UpdateRoleConfigDto extends (0, mapped_types_1.PartialType)(create_role_config_dto_1.CreateRoleConfigDto) {
}
exports.UpdateRoleConfigDto = UpdateRoleConfigDto;
//# sourceMappingURL=update-role-config.dto.js.map