import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expediente, ExpedienteSchema } from './schemas/expediente.schema';
import { ExpedienteRegistro, ExpedienteRegistroSchema } from './schemas/expediente-registro.schema';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expediente.name, schema: ExpedienteSchema },
      { name: ExpedienteRegistro.name, schema: ExpedienteRegistroSchema },
    ]),
    StudentsModule,
  ],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
})
export class ExpedientesModule {}
