"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantillaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_plantilla_dto_1 = require("./create-plantilla.dto");
class UpdatePlantillaDto extends (0, mapped_types_1.PartialType)(create_plantilla_dto_1.CreatePlantillaDto) {
}
exports.UpdatePlantillaDto = UpdatePlantillaDto;
//# sourceMappingURL=update-plantilla.dto.js.map