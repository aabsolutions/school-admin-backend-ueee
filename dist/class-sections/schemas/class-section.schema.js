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
exports.ClassSectionSchema = exports.ClassSection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ClassSection = class ClassSection {
};
exports.ClassSection = ClassSection;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], ClassSection.prototype, "className", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true }),
    __metadata("design:type", String)
], ClassSection.prototype, "classCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ClassSection.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ClassSection.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ClassSection.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ClassSection.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ClassSection.prototype, "roomNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ClassSection.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ClassSection.prototype, "semester", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ClassSection.prototype, "academicYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 30, min: 1 }),
    __metadata("design:type", Number)
], ClassSection.prototype, "classCapacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'inactive', 'completed'], default: 'active' }),
    __metadata("design:type", String)
], ClassSection.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['lecture', 'lab', 'seminar', 'online'], default: 'lecture' }),
    __metadata("design:type", String)
], ClassSection.prototype, "classType", void 0);
exports.ClassSection = ClassSection = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ClassSection);
exports.ClassSectionSchema = mongoose_1.SchemaFactory.createForClass(ClassSection);
//# sourceMappingURL=class-section.schema.js.map