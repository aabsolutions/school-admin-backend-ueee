"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSectionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_sections_service_1 = require("./class-sections.service");
const class_sections_controller_1 = require("./class-sections.controller");
const class_section_schema_1 = require("./schemas/class-section.schema");
let ClassSectionsModule = class ClassSectionsModule {
};
exports.ClassSectionsModule = ClassSectionsModule;
exports.ClassSectionsModule = ClassSectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: class_section_schema_1.ClassSection.name, schema: class_section_schema_1.ClassSectionSchema }])],
        controllers: [class_sections_controller_1.ClassSectionsController],
        providers: [class_sections_service_1.ClassSectionsService],
        exports: [class_sections_service_1.ClassSectionsService],
    })
], ClassSectionsModule);
//# sourceMappingURL=class-sections.module.js.map