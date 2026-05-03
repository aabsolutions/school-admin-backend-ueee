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
exports.ClassSectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_section_schema_1 = require("./schemas/class-section.schema");
let ClassSectionsService = class ClassSectionsService {
    constructor(classSectionModel) {
        this.classSectionModel = classSectionModel;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', courseId, teacherId, semester } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { className: { $regex: search, $options: 'i' } },
                { classCode: { $regex: search, $options: 'i' } },
            ];
        }
        if (courseId)
            filter.courseId = courseId;
        if (teacherId)
            filter.teacherId = teacherId;
        if (semester)
            filter.semester = semester;
        const [data, total] = await Promise.all([
            this.classSectionModel
                .find(filter)
                .populate('courseId', 'courseCode courseName')
                .populate('teacherId', 'name email')
                .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.classSectionModel.countDocuments(filter),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const section = await this.classSectionModel
            .findById(id)
            .populate('courseId', 'courseCode courseName credits')
            .populate('teacherId', 'name email');
        if (!section)
            throw new common_1.NotFoundException('Class section not found');
        return section;
    }
    async create(dto) {
        return new this.classSectionModel(dto).save();
    }
    async update(id, dto) {
        const updated = await this.classSectionModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Class section not found');
        return updated;
    }
    async remove(id) {
        const result = await this.classSectionModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Class section not found');
    }
};
exports.ClassSectionsService = ClassSectionsService;
exports.ClassSectionsService = ClassSectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_section_schema_1.ClassSection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassSectionsService);
//# sourceMappingURL=class-sections.service.js.map