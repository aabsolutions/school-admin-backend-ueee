"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMateriaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_materia_dto_1 = require("./create-materia.dto");
class UpdateMateriaDto extends (0, mapped_types_1.PartialType)(create_materia_dto_1.CreateMateriaDto) {
}
exports.UpdateMateriaDto = UpdateMateriaDto;
//# sourceMappingURL=update-materia.dto.js.map