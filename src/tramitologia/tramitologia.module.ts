import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plantilla, PlantillaSchema } from './schemas/plantilla.schema';
import { Tramite, TramiteSchema } from './schemas/tramite.schema';
import { TramiteHistory, TramiteHistorySchema } from './schemas/tramite-history.schema';
import { RoleConfig, RoleConfigSchema } from '../role-config/schemas/role-config.schema';
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
    TemplateRendererService,
    PdfService,
    TramiteCodigoService,
    TramiteRolesSeeder,
  ],
})
export class TramitologiaModule {}
