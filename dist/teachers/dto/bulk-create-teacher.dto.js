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
const trim = ({ value }) => {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === 'string') {
        const s = value.trim();
        return s === '' ? undefined : s;
    }
    return value;
};
const toUpper = ({ value }) => {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === 'string') {
        const s = value.trim().toUpperCase();
        return s === '' ? undefined : s;
    }
    return value;
};
const toNumber = ({ value }) => {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === 'string' && value.trim() === '')
        return undefined;
    const n = Number(value);
    return isNaN(n) ? undefined : n;
};
const toDateISO = ({ value }) => {
    if (!value)
        return undefined;
    const s = String(value).trim();
    if (!s)
        return undefined;
    if (/^\d{4}-\d{2}-\d{2}/.test(s))
        return s.substring(0, 10);
    const d = new Date(s);
    if (!isNaN(d.getTime()))
        return d.toISOString().substring(0, 10);
    return s;
};
const toBoolean = ({ value }) => {
    if (value === undefined || value === null || value === '')
        return undefined;
    if (typeof value === 'boolean')
        return value;
    const s = String(value).toLowerCase().trim();
    return s === 'true' || s === 'si' || s === '1' || s === 'yes';
};
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
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "dni", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "mobile", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toDateISO),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "subjectSpecialization", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkTeacherItemDto.prototype, "experienceYears", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['CONTRATO', 'NOMBRAMIENTO DEFINITIVO', 'NOMBRAMIENTO PROVISIONAL']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "laboralDependency", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['MATUTINA', 'VESPERTINA', 'NOCTURNA']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "jornadaLaboral", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "correoInstitucional", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
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
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "emergencyMobile", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'inactive', 'on-leave']),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkTeacherItemDto.prototype, "peso", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkTeacherItemDto.prototype, "talla", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "bloodType", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toBoolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkTeacherItemDto.prototype, "hasAllergies", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "allergiesDetail", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toBoolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkTeacherItemDto.prototype, "hasChronicCondition", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "chronicConditionDetail", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "currentMedications", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toBoolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkTeacherItemDto.prototype, "hasDisability", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "disabilityDetail", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toBoolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkTeacherItemDto.prototype, "hasConadis", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "conadisNumber", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "healthInsurance", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "policyNumber", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "spouseName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "spouseOccupation", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "spouseMobile", void 0);
__decorate([
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkTeacherItemDto.prototype, "numberOfChildren", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "childrenAges", void 0);
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkTeacherItemDto.prototype, "housingType", void 0);
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