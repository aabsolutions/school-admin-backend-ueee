import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { TramiteRoleGuard } from '../guards/tramite-role.guard';
import { RequireTramiteRole } from '../decorators/tramite-role.decorator';
import { TramiteReportsService } from '../services/tramite-reports.service';
import { ReportsQueryDto } from '../dto/reports-query.dto';

@Controller('tramites/reports')
@UseGuards(JwtAuthGuard, RolesGuard, TramiteRoleGuard)
@RequireTramiteRole('TRAMITE_ADMIN', 'TRAMITE_VERIFICADOR')
export class TramiteReportsController {
  constructor(private readonly reportsService: TramiteReportsService) {}

  @Get('stats')
  getStats(@Query() query: ReportsQueryDto) {
    return this.reportsService.getStats(query);
  }

  @Get('export')
  getExport(@Query() query: ReportsQueryDto) {
    return this.reportsService.getExportList(query);
  }
}
