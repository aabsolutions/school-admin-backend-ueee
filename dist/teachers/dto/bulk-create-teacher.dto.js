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
exports.BulkCreateTeacherDto = exports.BulkTeacherItemDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const toUpper = ({ value }) => typeof value === 'string' ? value.toUpperCase() : value;
class BulkTeacherItemDto {
}
exports.BulkTeacherItemDto = BulkTeacherItemDto;
__decorate([
    (0, class_transformer_1.Transform)(toUpper),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "subjectSpecialization", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkTeacherItemDto.prototype, "experienceYears", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "laboralDependency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "salarialCategory", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toUpper),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "emergencyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "emergencyMobile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'inactive', 'on-leave']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "status", void 0);
class BulkCreateTeacherDto {
}
exports.BulkCreateTeacherDto = BulkCreateTeacherDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkTeacherItemDto),
    __metadata("design:type", Array)
], BulkCreateTeacherDto.prototype, "records", void 0);
//# sourceMappingURL=bulk-create-teacher.dto.js.map