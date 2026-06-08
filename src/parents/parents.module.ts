import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Enrollment, EnrollmentSchema } from '../enrollments/schemas/enrollment.schema';
import { Expediente, ExpedienteSchema } from '../expedientes/schemas/expediente.schema';
import { ExpedienteRegistro, ExpedienteRegistroSchema } from '../expedientes/schemas/expediente-registro.schema';
import { DeceExpediente, DeceExpedienteSchema } from '../dece/schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroSchema } from '../dece/schemas/dece-registro.schema';
import { AttendanceRecord, AttendanceRecordSchema } from '../asistencias/schemas/attendance-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parent.name, schema: ParentSchema },
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Expediente.name, schema: ExpedienteSchema },
      { name: ExpedienteRegistro.name, schema: ExpedienteRegistroSchema },
      { name: DeceExpediente.name, schema: DeceExpedienteSchema },
      { name: DeceRegistro.name, schema: DeceRegistroSchema },
      { name: AttendanceRecord.name, schema: AttendanceRecordSchema },
    ]),
  ],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}
