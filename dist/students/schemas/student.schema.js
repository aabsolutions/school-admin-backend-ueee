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
exports.StudentSchema = exports.Student = exports.StudentFamilyInfoSchema = exports.StudentFamilyInfo = exports.StudentMedicalInfoSchema = exports.StudentMedicalInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StudentMedicalInfo = class StudentMedicalInfo {
};
exports.StudentMedicalInfo = StudentMedicalInfo;
__decorate([
    (0, mongoose_1.Prop)({ enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StudentMedicalInfo.prototype, "hasAllergies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "allergiesDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StudentMedicalInfo.prototype, "hasChronicCondition", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "chronicConditionDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "currentMedications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StudentMedicalInfo.prototype, "hasDisability", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "disabilityDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], StudentMedicalInfo.prototype, "hasConadis", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "conadisNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "doctorName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "doctorPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "healthInsurance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "policyNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "emergencyContactName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "emergencyContactRelation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentMedicalInfo.prototype, "medicalNotes", void 0);
exports.StudentMedicalInfo = StudentMedicalInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], StudentMedicalInfo);
exports.StudentMedicalInfoSchema = mongoose_1.SchemaFactory.createForClass(StudentMedicalInfo);
let StudentFamilyInfo = class StudentFamilyInfo {
};
exports.StudentFamilyInfo = StudentFamilyInfo;
__decorate([
    (0, mongoose_1.Prop)({
        enum: [
            'Biparental',
            'Monoparental madre',
            'Monoparental padre',
            'Tutela legal',
            'Otra',
        ],
    }),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "familySituation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "livesWithWhom", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "fatherOccupation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] }),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "fatherEducationLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "motherOccupation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Ninguna', 'Primaria', 'Secundaria', 'Superior', 'Posgrado'] }),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "motherEducationLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], StudentFamilyInfo.prototype, "numberOfSiblings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], StudentFamilyInfo.prototype, "studentBirthOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Bajo', 'Medio bajo', 'Medio', 'Medio alto', 'Alto'] }),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "socioeconomicLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Propia', 'Arrendada', 'Prestada', 'Otra'] }),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "housingType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StudentFamilyInfo.prototype, "familyNotes", void 0);
exports.StudentFamilyInfo = StudentFamilyInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], StudentFamilyInfo);
exports.StudentFamilyInfoSchema = mongoose_1.SchemaFactory.createForClass(StudentFamilyInfo);
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "img", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "imgCuerpoEntero", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Student.prototype, "peso", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Student.prototype, "talla", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    __metadata("design:type", String)
], Student.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "mobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Male', 'Female', 'Other'] }),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['URBANA', 'RURAL', 'FUERA DEL CANTÓN'] }),
    __metadata("design:type", String)
], Student.prototype, "residenceZone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Student.prototype, "birthdate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "parentGuardianName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "parentGuardianMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "fatherName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "fatherMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "motherName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "motherMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'inactive', 'graduated', 'suspended'], default: 'active' }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.StudentMedicalInfoSchema, default: {} }),
    __metadata("design:type", StudentMedicalInfo)
], Student.prototype, "medicalInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.StudentFamilyInfoSchema, default: {} }),
    __metadata("design:type", StudentFamilyInfo)
], Student.prototype, "familyInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Parent', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "fatherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Parent', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "motherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Parent', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "guardianId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Parent' }], default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "parentIds", void 0);
exports.Student = Student = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Student);
exports.StudentSchema = mongoose_1.SchemaFactory.createForClass(Student);
exports.StudentSchema.index({ parentIds: 1 });
//# sourceMappingURL=student.schema.js.map