"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const Joi = require("joi");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const departments_module_1 = require("./departments/departments.module");
const students_module_1 = require("./students/students.module");
const teachers_module_1 = require("./teachers/teachers.module");
const courses_module_1 = require("./courses/courses.module");
const cursos_module_1 = require("./cursos/cursos.module");
const curso_lectivo_module_1 = require("./curso-lectivo/curso-lectivo.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const expedientes_module_1 = require("./expedientes/expedientes.module");
const dece_module_1 = require("./dece/dece.module");
const documental_estudiante_module_1 = require("./documental-estudiante/documental-estudiante.module");
const documental_docente_module_1 = require("./documental-docente/documental-docente.module");
const materias_module_1 = require("./materias/materias.module");
const carga_horaria_module_1 = require("./carga-horaria/carga-horaria.module");
const area_estudio_module_1 = require("./area-estudio/area-estudio.module");
const institucion_module_1 = require("./institucion/institucion.module");
const messaging_module_1 = require("./messaging/messaging.module");
const notifications_module_1 = require("./notifications/notifications.module");
const parents_module_1 = require("./parents/parents.module");
const communicados_module_1 = require("./communicados/communicados.module");
const role_config_module_1 = require("./role-config/role-config.module");
const asistencias_module_1 = require("./asistencias/asistencias.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'production', 'test')
                        .default('development'),
                    PORT: Joi.number().default(3000),
                    MONGO_URI: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRES_IN: Joi.string().default('3600s'),
                    CORS_ORIGIN: Joi.string().default('http://localhost:4200'),
                    CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
                    CLOUDINARY_API_KEY: Joi.string().optional(),
                    CLOUDINARY_API_SECRET: Joi.string().optional(),
                    RESEND_API_KEY: Joi.string().required(),
                    RESEND_FROM_EMAIL: Joi.string().email().optional(),
                    FRONTEND_URL: Joi.string().uri().optional(),
                }),
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ ttl: 60000, limit: 60 }],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    uri: config.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            cloudinary_module_1.CloudinaryModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            departments_module_1.DepartmentsModule,
            students_module_1.StudentsModule,
            teachers_module_1.TeachersModule,
            courses_module_1.CoursesModule,
            cursos_module_1.CursosModule,
            curso_lectivo_module_1.CursoLectivoModule,
            enrollments_module_1.EnrollmentsModule,
            expedientes_module_1.ExpedientesModule,
            dece_module_1.DeceModule,
            documental_estudiante_module_1.DocumentalEstudianteModule,
            documental_docente_module_1.DocumentalDocenteModule,
            materias_module_1.MateriasModule,
            carga_horaria_module_1.CargaHorariaModule,
            area_estudio_module_1.AreaEstudioModule,
            institucion_module_1.InstitucionModule,
            messaging_module_1.MessagingModule,
            notifications_module_1.NotificationsModule,
            parents_module_1.ParentsModule,
            communicados_module_1.CommunicadosModule,
            role_config_module_1.RoleConfigModule,
            asistencias_module_1.AsistenciasModule,
        ],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map