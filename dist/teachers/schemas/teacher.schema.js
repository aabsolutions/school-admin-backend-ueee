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
exports.TeacherSchema = exports.Teacher = exports.TeacherFamilyInfoSchema = exports.TeacherFamilyInfo = exports.TeacherMedicalInfoSchema = exports.TeacherMedicalInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TeacherMedicalInfo = class TeacherMedicalInfo {
};
exports.TeacherMedicalInfo = TeacherMedicalInfo;
__decorate([
    (0, mongoose_1.Prop)({ enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TeacherMedicalInfo.prototype, "hasAllergies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "allergiesDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TeacherMedicalInfo.prototype, "hasChronicCondition", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "chronicConditionDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "currentMedications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TeacherMedicalInfo.prototype, "hasDisability", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "disabilityDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TeacherMedicalInfo.prototype, "hasConadis", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "conadisNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "healthInsurance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "policyNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "emergencyContactName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "emergencyContactRelation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherMedicalInfo.prototype, "medicalNotes", void 0);
exports.TeacherMedicalInfo = TeacherMedicalInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TeacherMedicalInfo);
exports.TeacherMedicalInfoSchema = mongoose_1.SchemaFactory.createForClass(TeacherMedicalInfo);
let TeacherFamilyInfo = class TeacherFamilyInfo {
};
exports.TeacherFamilyInfo = TeacherFamilyInfo;
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre'],
    }),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "maritalStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "spouseName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "spouseOccupation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "spouseMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], TeacherFamilyInfo.prototype, "numberOfChildren", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "childrenAges", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "housingType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TeacherFamilyInfo.prototype, "familyNotes", void 0);
exports.TeacherFamilyInfo = TeacherFamilyInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TeacherFamilyInfo);
exports.TeacherFamilyInfoSchema = mongoose_1.SchemaFactory.createForClass(TeacherFamilyInfo);
let Teacher = class Teacher {
};
exports.Teacher = Teacher;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Teacher.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "img", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "imgCuerpoEntero", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Teacher.prototype, "peso", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Teacher.prototype, "talla", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Teacher.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    __metadata("design:type", String)
], Teacher.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Male', 'Female', 'Other'] }),
    __metadata("design:type", String)
], Teacher.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "mobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Contrato', 'Nomb. Definitivo', 'Nomb. Provisional'] }),
    __metadata("design:type", String)
], Teacher.prototype, "laboralDependency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] }),
    __metadata("design:type", String)
], Teacher.prototype, "salarialCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "emergencyName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "emergencyMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Department' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Teacher.prototype, "departmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AreaEstudio' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Teacher.prototype, "areaEstudioId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "subjectSpecialization", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Teacher.prototype, "experienceYears", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'inactive', 'on-leave'], default: 'active' }),
    __metadata("design:type", String)
], Teacher.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Teacher.prototype, "birthdate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Teacher.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.TeacherMedicalInfoSchema, default: {} }),
    __metadata("design:type", TeacherMedicalInfo)
], Teacher.prototype, "medicalInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.TeacherFamilyInfoSchema, default: {} }),
    __metadata("design:type", TeacherFamilyInfo)
], Teacher.prototype, "familyInfo", void 0);
exports.Teacher = Teacher = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Teacher);
exports.TeacherSchema = mongoose_1.SchemaFactory.createForClass(Teacher);
//# sourceMappingURL=teacher.schema.js.map