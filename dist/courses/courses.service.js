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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./schemas/course.schema");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { courseCode: { $regex: search, $options: 'i' } },
                { courseName: { $regex: search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.courseModel
                .find(filter)
                .populate('departmentId', 'departmentName')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.courseModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const course = await this.courseModel.findById(id).populate('departmentId', 'departmentName');
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async create(dto) {
        return new this.courseModel(dto).save();
    }
    async update(id, dto) {
        const updated = await this.courseModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Course not found');
        return updated;
    }
    async remove(id) {
        const result = await this.courseModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Course not found');
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map