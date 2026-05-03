"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const parents_service_1 = require("./parents.service");
const parents_controller_1 = require("./parents.controller");
const parent_schema_1 = require("./schemas/parent.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let ParentsModule = class ParentsModule {
};
exports.ParentsModule = ParentsModule;
exports.ParentsModule = ParentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [parents_controller_1.ParentsController],
        providers: [parents_service_1.ParentsService],
        exports: [parents_service_1.ParentsService],
    })
], ParentsModule);
//# sourceMappingURL=parents.module.js.map