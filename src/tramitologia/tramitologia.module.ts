import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plantilla, PlantillaSchema } from './schemas/plantilla.schema';
import { Tramite, TramiteSchema } from './schemas/tramite.schema';
import { TramiteHistory, TramiteHistorySchema } from './schemas/tramite-history.schema';
import { RoleConfig, RoleConfigSchema } from '../role-config/schemas/role-config.schema';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { Parent, ParentSchema } from '../parents/schemas/parent.schema';
import { Enrollment, EnrollmentSchema } from '../enrollments/schemas/enrollment.schema';
import { CursoLectivo, CursoLectivoSchema } from '../curso-lectivo/schemas/curso-lectivo.schema';
import { Curso, CursoSchema } from '../cursos/schemas/curso.schema';
import { Teacher, TeacherSchema } from '../teachers/schemas/teacher.schema';
import { Institucion, InstitucionSchema } from '../institucion/schemas/institucion.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PlantillasController } from './controllers/plantillas.controller';
import { TramitesController } from './controllers/tramites.controller';
import { TramiteReportsController } from './controllers/tramite-reports.controller';
import { PlantillasService } from './services/plantillas.service';
import { TramitesService } from './services/tramites.service';
import { TramiteWorkflowService } from './services/tramite-workflow.service';
import { TramiteReportsService } from './services/tramite-reports.service';
import { VariableParserService } from './services/variable-parser.service';
import { VariableResolverService } from './services/variable-resolver.service';
import { TemplateRendererService } from './services/template-renderer.service';
import { PdfService } from './services/pdf.service';
import { TramiteCodigoService } from './services/tramite-codigo.service';
import { TramiteRolesSeeder } from './seeds/tramite-roles.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plantilla.name, schema: PlantillaSchema },
      { name: Tramite.name, schema: TramiteSchema },
      { name: TramiteHistory.name, schema: TramiteHistorySchema },
      { name: RoleConfig.name, schema: RoleConfigSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: CursoLectivo.name, schema: CursoLectivoSchema },
      { name: Curso.name, schema: CursoSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Institucion.name, schema: InstitucionSchema },
    ]),
    NotificationsModule,
    CloudinaryModule,
  ],
  controllers: [
    PlantillasController,
    TramitesController,
    TramiteReportsController,
  ],
  providers: [
    PlantillasService,
    TramitesService,
    TramiteWorkflowService,
    TramiteReportsService,
    VariableParserService,
    VariableResolverService,
    TemplateRendererService,
    PdfService,
    TramiteCodigoService,
    TramiteRolesSeeder,
  ],
})
export class TramitologiaModule {}
