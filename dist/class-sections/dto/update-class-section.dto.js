"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassSectionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_class_section_dto_1 = require("./create-class-section.dto");
class UpdateClassSectionDto extends (0, mapped_types_1.PartialType)(create_class_section_dto_1.CreateClassSectionDto) {
}
exports.UpdateClassSectionDto = UpdateClassSectionDto;
//# sourceMappingURL=update-class-section.dto.js.map