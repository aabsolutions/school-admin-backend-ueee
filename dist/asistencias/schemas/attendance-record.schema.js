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
exports.AttendanceRecordSchema = exports.AttendanceRecord = exports.AttendanceEntrySchema = exports.AttendanceEntry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AttendanceEntry = class AttendanceEntry {
};
exports.AttendanceEntry = AttendanceEntry;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceEntry.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['present', 'absent', 'late', 'excused'], default: 'present' }),
    __metadata("design:type", String)
], AttendanceEntry.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AttendanceEntry.prototype, "note", void 0);
exports.AttendanceEntry = AttendanceEntry = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], AttendanceEntry);
exports.AttendanceEntrySchema = mongoose_1.SchemaFactory.createForClass(AttendanceEntry);
let AttendanceRecord = class AttendanceRecord {
};
exports.AttendanceRecord = AttendanceRecord;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'CursoLectivo', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceRecord.prototype, "cursoLectivoId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Curso', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceRecord.prototype, "cursoId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceRecord.prototype, "takenByUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.AttendanceEntrySchema], default: [] }),
    __metadata("design:type", Array)
], AttendanceRecord.prototype, "records", void 0);
exports.AttendanceRecord = AttendanceRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AttendanceRecord);
exports.AttendanceRecordSchema = mongoose_1.SchemaFactory.createForClass(AttendanceRecord);
exports.AttendanceRecordSchema.index({ cursoLectivoId: 1, date: 1 }, { unique: true });
exports.AttendanceRecordSchema.index({ cursoLectivoId: 1, date: -1 });
exports.AttendanceRecordSchema.index({ 'records.studentId': 1, date: -1 });
//# sourceMappingURL=attendance-record.schema.js.map