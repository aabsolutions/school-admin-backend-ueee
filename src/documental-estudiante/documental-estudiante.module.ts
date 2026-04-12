import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentalEstudianteService } from './documental-estudiante.service';
import { DocumentalEstudianteController } from './documental-estudiante.controller';
import {
  DocumentalEstudiante,
  DocumentalEstudianteSchema,
} from './schemas/documental-estudiante.schema';
import { Enrollment, EnrollmentSchema } from '../enrollments/schemas/enrollment.schema';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentalEstudiante.name, schema: DocumentalEstudianteSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
    StudentsModule,
  ],
  controllers: [DocumentalEstudianteController],
  providers: [DocumentalEstudianteService],
})
export class DocumentalEstudianteModule {}
