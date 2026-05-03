"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCursoLectivoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_curso_lectivo_dto_1 = require("./create-curso-lectivo.dto");
class UpdateCursoLectivoDto extends (0, mapped_types_1.PartialType)(create_curso_lectivo_dto_1.CreateCursoLectivoDto) {
}
exports.UpdateCursoLectivoDto = UpdateCursoLectivoDto;
//# sourceMappingURL=update-curso-lectivo.dto.js.map