import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpedienteAcademicoService } from './expediente-academico.service';
import { ExpedienteAcademicoController } from './expediente-academico.controller';
import {
  ExpedienteAcademico,
  ExpedienteAcademicoSchema,
} from './schemas/expediente-academico.schema';
import {
  ExpedienteAcademicoDocumento,
  ExpedienteAcademicoDocumentoSchema,
} from './schemas/expediente-academico-documento.schema';
import { StudentsModule } from '../students/students.module';
import { ParentsModule } from '../parents/parents.module';
import { Student, StudentSchema } from '../students/schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExpedienteAcademico.name, schema: ExpedienteAcademicoSchema },
      { name: ExpedienteAcademicoDocumento.name, schema: ExpedienteAcademicoDocumentoSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    StudentsModule,
    ParentsModule,
  ],
  controllers: [ExpedienteAcademicoController],
  providers: [ExpedienteAcademicoService],
})
export class ExpedienteAcademicoModule {}
