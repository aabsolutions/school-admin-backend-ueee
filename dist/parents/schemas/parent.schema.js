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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentSchema = exports.Parent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Parent = class Parent {
};
exports.Parent = Parent;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Parent.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Parent.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Parent.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    __metadata("design:type", String)
], Parent.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Parent.prototype, "mobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Male', 'Female', 'Other'] }),
    __metadata("design:type", String)
], Parent.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Parent.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Parent.prototype, "occupation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] }),
    __metadata("design:type", String)
], Parent.prototype, "educationLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Student' }], default: [] }),
    __metadata("design:type", Array)
], Parent.prototype, "studentIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Parent.prototype, "isActive", void 0);
exports.Parent = Parent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Parent);
exports.ParentSchema = mongoose_1.SchemaFactory.createForClass(Parent);
exports.ParentSchema.index({ studentIds: 1 });
//# sourceMappingURL=parent.schema.js.map