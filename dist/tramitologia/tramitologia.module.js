"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TramitologiaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const plantilla_schema_1 = require("./schemas/plantilla.schema");
const tramite_schema_1 = require("./schemas/tramite.schema");
const tramite_history_schema_1 = require("./schemas/tramite-history.schema");
const role_config_schema_1 = require("../role-config/schemas/role-config.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const parent_schema_1 = require("../parents/schemas/parent.schema");
const enrollment_schema_1 = require("../enrollments/schemas/enrollment.schema");
const curso_lectivo_schema_1 = require("../curso-lectivo/schemas/curso-lectivo.schema");
const curso_schema_1 = require("../cursos/schemas/curso.schema");
const teacher_schema_1 = require("../teachers/schemas/teacher.schema");
const institucion_schema_1 = require("../institucion/schemas/institucion.schema");
const notifications_module_1 = require("../notifications/notifications.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const plantillas_controller_1 = require("./controllers/plantillas.controller");
const tramites_controller_1 = require("./controllers/tramites.controller");
const tramite_reports_controller_1 = require("./controllers/tramite-reports.controller");
const plantillas_service_1 = require("./services/plantillas.service");
const tramites_service_1 = require("./services/tramites.service");
const tramite_workflow_service_1 = require("./services/tramite-workflow.service");
const tramite_reports_service_1 = require("./services/tramite-reports.service");
const variable_parser_service_1 = require("./services/variable-parser.service");
const variable_resolver_service_1 = require("./services/variable-resolver.service");
const template_renderer_service_1 = require("./services/template-renderer.service");
const pdf_service_1 = require("./services/pdf.service");
const tramite_codigo_service_1 = require("./services/tramite-codigo.service");
const tramite_roles_seeder_1 = require("./seeds/tramite-roles.seeder");
let TramitologiaModule = class TramitologiaModule {
};
exports.TramitologiaModule = TramitologiaModule;
exports.TramitologiaModule = TramitologiaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: plantilla_schema_1.Plantilla.name, schema: plantilla_schema_1.PlantillaSchema },
                { name: tramite_schema_1.Tramite.name, schema: tramite_schema_1.TramiteSchema },
                { name: tramite_history_schema_1.TramiteHistory.name, schema: tramite_history_schema_1.TramiteHistorySchema },
                { name: role_config_schema_1.RoleConfig.name, schema: role_config_schema_1.RoleConfigSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema },
                { name: enrollment_schema_1.Enrollment.name, schema: enrollment_schema_1.EnrollmentSchema },
                { name: curso_lectivo_schema_1.CursoLectivo.name, schema: curso_lectivo_schema_1.CursoLectivoSchema },
                { name: curso_schema_1.Curso.name, schema: curso_schema_1.CursoSchema },
                { name: teacher_schema_1.Teacher.name, schema: teacher_schema_1.TeacherSchema },
                { name: institucion_schema_1.Institucion.name, schema: institucion_schema_1.InstitucionSchema },
            ]),
            notifications_module_1.NotificationsModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [
            plantillas_controller_1.PlantillasController,
            tramites_controller_1.TramitesController,
            tramite_reports_controller_1.TramiteReportsController,
        ],
        providers: [
            plantillas_service_1.PlantillasService,
            tramites_service_1.TramitesService,
            tramite_workflow_service_1.TramiteWorkflowService,
            tramite_reports_service_1.TramiteReportsService,
            variable_parser_service_1.VariableParserService,
            variable_resolver_service_1.VariableResolverService,
            template_renderer_service_1.TemplateRendererService,
            pdf_service_1.PdfService,
            tramite_codigo_service_1.TramiteCodigoService,
            tramite_roles_seeder_1.TramiteRolesSeeder,
        ],
    })
], TramitologiaModule);
//# sourceMappingURL=tramitologia.module.js.map