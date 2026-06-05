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
exports.VariableResolverService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("../../students/schemas/student.schema");
const parent_schema_1 = require("../../parents/schemas/parent.schema");
const enrollment_schema_1 = require("../../enrollments/schemas/enrollment.schema");
const curso_lectivo_schema_1 = require("../../curso-lectivo/schemas/curso-lectivo.schema");
const curso_schema_1 = require("../../cursos/schemas/curso.schema");
const teacher_schema_1 = require("../../teachers/schemas/teacher.schema");
const institucion_schema_1 = require("../../institucion/schemas/institucion.schema");
const MONTH_NAMES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
let VariableResolverService = class VariableResolverService {
    constructor(studentModel, parentModel, enrollmentModel, cursoLectivoModel, cursoModel, teacherModel, institucionModel) {
        this.studentModel = studentModel;
        this.parentModel = parentModel;
        this.enrollmentModel = enrollmentModel;
        this.cursoLectivoModel = cursoLectivoModel;
        this.cursoModel = cursoModel;
        this.teacherModel = teacherModel;
        this.institucionModel = institucionModel;
    }
    async resolve(ctx, actor, observation) {
        const now = new Date();
        const fmt = (d) => new Intl.DateTimeFormat('es-EC').format(d);
        const vars = {};
        vars['FECHA_ACTUAL'] = fmt(now);
        vars['FECHA_DIA'] = String(now.getDate());
        vars['FECHA_MES'] = String(now.getMonth() + 1).padStart(2, '0');
        vars['FECHA_MES_NOMBRE'] = MONTH_NAMES[now.getMonth()];
        vars['FECHA_ANIO'] = String(now.getFullYear());
        vars['FECHA_LARGA'] = `${now.getDate()} de ${MONTH_NAMES[now.getMonth()]} de ${now.getFullYear()}`;
        vars['FECHA_HORA'] = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
        vars['USUARIO_LOGUEADO'] = actor.name;
        vars['ID_TRAMITE'] = ctx.codigo;
        vars['CODIGO_TRAMITE'] = ctx.codigo;
        vars['OBSERVACION_TRAMITE'] = observation ?? '';
        vars['NOMBRE_SOLICITANTE'] = ctx.datosRepresentante?.nombre ?? '';
        vars['REPRESENTANTE_NOMBRE'] = ctx.datosRepresentante?.nombre ?? '';
        vars['REPRESENTANTE_DNI'] = ctx.datosRepresentante?.dni ?? '';
        vars['REPRESENTANTE_MOBILE'] = ctx.datosRepresentante?.contacto ?? '';
        vars['REPRESENTANTE_EMAIL'] = '';
        vars['REPRESENTANTE_GENERO'] = '';
        vars['REPRESENTANTE_OCUPACION'] = '';
        vars['REPRESENTANTE_NIVEL_EDUCATIVO'] = '';
        vars['REPRESENTANTE_DIRECCION'] = '';
        let student = null;
        if (ctx.estudianteId) {
            student = await this.studentModel.findById(ctx.estudianteId).lean().exec();
        }
        if (student) {
            vars['NOMBRE_ESTUDIANTE'] = student.name ?? '';
            vars['ESTUDIANTE_DNI'] = student.dni ?? '';
            vars['ESTUDIANTE_EMAIL'] = student.email ?? '';
            vars['ESTUDIANTE_MOBILE'] = student.mobile ?? '';
            vars['ESTUDIANTE_GENERO'] = student.gender ?? '';
            vars['ESTUDIANTE_FECHA_NACIMIENTO'] = student.birthdate ? fmt(new Date(student.birthdate)) : '';
            vars['ESTUDIANTE_EDAD'] = student.birthdate
                ? String(Math.floor((now.getTime() - new Date(student.birthdate).getTime()) / (365.25 * 24 * 3600 * 1000)))
                : '';
            vars['ESTUDIANTE_DIRECCION'] = student.address ?? '';
            vars['ESTUDIANTE_ZONA_RESIDENCIA'] = student.residenceZone ?? '';
            vars['ESTUDIANTE_REPRESENTANTE'] = student.parentGuardianName ?? '';
            vars['ESTUDIANTE_REPRESENTANTE_MOBILE'] = student.parentGuardianMobile ?? '';
            vars['ESTUDIANTE_PADRE_NOMBRE'] = student.fatherName ?? '';
            vars['ESTUDIANTE_PADRE_MOBILE'] = student.fatherMobile ?? '';
            vars['ESTUDIANTE_MADRE_NOMBRE'] = student.motherName ?? '';
            vars['ESTUDIANTE_MADRE_MOBILE'] = student.motherMobile ?? '';
            vars['ESTUDIANTE_SITUACION_FAMILIAR'] = student.familyInfo?.familySituation ?? '';
            vars['ESTUDIANTE_VIVE_CON'] = student.familyInfo?.livesWithWhom ?? '';
            const parentId = student.guardianId ?? student.fatherId ?? student.motherId ?? (student.parentIds?.[0] ?? null);
            const parent = parentId
                ? await this.parentModel.findById(parentId).lean().exec()
                : await this.parentModel.findOne({ studentIds: student._id }).lean().exec();
            if (parent) {
                if (parent.name)
                    vars['REPRESENTANTE_NOMBRE'] = parent.name;
                if (parent.dni)
                    vars['REPRESENTANTE_DNI'] = parent.dni;
                if (parent.email)
                    vars['REPRESENTANTE_EMAIL'] = parent.email;
                if (parent.mobile)
                    vars['REPRESENTANTE_MOBILE'] = parent.mobile;
                if (parent.gender)
                    vars['REPRESENTANTE_GENERO'] = parent.gender;
                if (parent.occupation)
                    vars['REPRESENTANTE_OCUPACION'] = parent.occupation;
                if (parent.educationLevel)
                    vars['REPRESENTANTE_NIVEL_EDUCATIVO'] = parent.educationLevel;
                if (parent.address)
                    vars['REPRESENTANTE_DIRECCION'] = parent.address;
            }
            const enrollment = await this.enrollmentModel
                .findOne({ studentId: student._id, status: 'enrolled' })
                .sort({ enrolledAt: -1 })
                .lean()
                .exec();
            if (enrollment) {
                const cursoLectivo = await this.cursoLectivoModel.findById(enrollment.cursoLectivoId).lean().exec();
                if (cursoLectivo) {
                    vars['ANIO_LECTIVO'] = cursoLectivo.academicYear ?? '';
                    vars['CURSO_ESTADO'] = cursoLectivo.status ?? '';
                    const curso = await this.cursoModel.findById(cursoLectivo.cursoId).lean().exec();
                    if (curso) {
                        vars['CURSO_NOMBRE'] = [curso.nivel, curso.paralelo, curso.jornada].filter(Boolean).join(' ');
                        vars['CURSO_NIVEL'] = curso.nivel ?? '';
                        vars['CURSO_PARALELO'] = curso.paralelo ?? '';
                        vars['CURSO_JORNADA'] = curso.jornada ?? '';
                        vars['CURSO_ESPECIALIDAD'] = curso.especialidad ?? '';
                        vars['CURSO_SUBNIVEL'] = curso.subnivel ?? '';
                    }
                    if (cursoLectivo.tutorId) {
                        const t = await this.teacherModel.findById(cursoLectivo.tutorId).select('name').lean().exec();
                        vars['CURSO_TUTOR'] = t?.name ?? '';
                    }
                    if (cursoLectivo.inspectorId) {
                        const t = await this.teacherModel.findById(cursoLectivo.inspectorId).select('name').lean().exec();
                        vars['CURSO_INSPECTOR'] = t?.name ?? '';
                    }
                    if (cursoLectivo.psicologoId) {
                        const t = await this.teacherModel.findById(cursoLectivo.psicologoId).select('name').lean().exec();
                        vars['CURSO_PSICOLOGO'] = t?.name ?? '';
                    }
                }
            }
            else if (ctx.cursoNombre) {
                vars['CURSO_NOMBRE'] = ctx.cursoNombre;
            }
        }
        else {
            vars['NOMBRE_ESTUDIANTE'] = '';
            vars['CURSO_NOMBRE'] = ctx.cursoNombre ?? '';
        }
        const DEFAULTS = [
            'ESTUDIANTE_DNI', 'ESTUDIANTE_EMAIL', 'ESTUDIANTE_MOBILE', 'ESTUDIANTE_GENERO',
            'ESTUDIANTE_FECHA_NACIMIENTO', 'ESTUDIANTE_EDAD', 'ESTUDIANTE_DIRECCION', 'ESTUDIANTE_ZONA_RESIDENCIA',
            'ESTUDIANTE_REPRESENTANTE', 'ESTUDIANTE_REPRESENTANTE_MOBILE', 'ESTUDIANTE_PADRE_NOMBRE',
            'ESTUDIANTE_PADRE_MOBILE', 'ESTUDIANTE_MADRE_NOMBRE', 'ESTUDIANTE_MADRE_MOBILE',
            'ESTUDIANTE_SITUACION_FAMILIAR', 'ESTUDIANTE_VIVE_CON',
            'CURSO_NIVEL', 'CURSO_PARALELO', 'CURSO_JORNADA', 'CURSO_ESPECIALIDAD', 'CURSO_SUBNIVEL',
            'ANIO_LECTIVO', 'CURSO_ESTADO', 'CURSO_TUTOR', 'CURSO_INSPECTOR', 'CURSO_PSICOLOGO',
        ];
        for (const k of DEFAULTS) {
            if (vars[k] === undefined)
                vars[k] = '';
        }
        const institucion = await this.institucionModel.findOne().populate('autoridad', 'name email').lean().exec();
        if (institucion) {
            vars['INSTITUCION_NOMBRE'] = institucion.nombre ?? '';
            vars['INSTITUCION_AMIE'] = institucion.codigoAMIE ?? '';
            vars['INSTITUCION_DISTRITO'] = institucion.distrito ?? '';
            vars['INSTITUCION_PROVINCIA'] = institucion.provincia ?? '';
            vars['INSTITUCION_CANTON'] = institucion.canton ?? '';
            vars['INSTITUCION_DIRECCION'] = institucion.direccion ?? '';
            vars['INSTITUCION_EMAIL'] = institucion.email ?? '';
            vars['INSTITUCION_CONTACTO'] = institucion.contacto ?? '';
            const auth = institucion.autoridad;
            vars['INSTITUCION_AUTORIDAD'] = auth?.name ?? '';
            vars['INSTITUCION_AUTORIDAD_EMAIL'] = auth?.email ?? '';
            vars['INSTITUCION_PERIODO_LECTIVO'] = institucion.periodoLectivoFuncional ?? '';
        }
        else {
            for (const k of ['INSTITUCION_NOMBRE', 'INSTITUCION_AMIE', 'INSTITUCION_DISTRITO', 'INSTITUCION_PROVINCIA',
                'INSTITUCION_CANTON', 'INSTITUCION_DIRECCION', 'INSTITUCION_EMAIL', 'INSTITUCION_CONTACTO',
                'INSTITUCION_AUTORIDAD', 'INSTITUCION_AUTORIDAD_EMAIL', 'INSTITUCION_PERIODO_LECTIVO']) {
                vars[k] = '';
            }
        }
        return vars;
    }
};
exports.VariableResolverService = VariableResolverService;
exports.VariableResolverService = VariableResolverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(1, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __param(2, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __param(3, (0, mongoose_1.InjectModel)(curso_lectivo_schema_1.CursoLectivo.name)),
    __param(4, (0, mongoose_1.InjectModel)(curso_schema_1.Curso.name)),
    __param(5, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(6, (0, mongoose_1.InjectModel)(institucion_schema_1.Institucion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], VariableResolverService);
//# sourceMappingURL=variable-resolver.service.js.map