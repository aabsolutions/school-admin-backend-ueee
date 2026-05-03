import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import {
  AttendanceAssignment,
  AttendanceAssignmentSchema,
} from './schemas/attendance-assignment.schema';
import {
  AttendanceRecord,
  AttendanceRecordSchema,
} from './schemas/attendance-record.schema';
import {
  CursoLectivo,
  CursoLectivoSchema,
} from '../curso-lectivo/schemas/curso-lectivo.schema';
import {
  Enrollment,
  EnrollmentSchema,
} from '../enrollments/schemas/enrollment.schema';
import { Parent, ParentSchema } from '../parents/schemas/parent.schema';
import { CommunicadosModule } from '../communicados/communicados.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttendanceAssignment.name, schema: AttendanceAssignmentSchema },
      { name: AttendanceRecord.name, schema: AttendanceRecordSchema },
      { name: CursoLectivo.name, schema: CursoLectivoSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
    CommunicadosModule,
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
  exports: [AsistenciasService],
})
export class AsistenciasModule {}
