import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeceService } from './dece.service';
import { DeceController } from './dece.controller';
import { DeceExpediente, DeceExpedienteSchema } from './schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroSchema } from './schemas/dece-registro.schema';
import { StudentsModule } from '../students/students.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeceExpediente.name, schema: DeceExpedienteSchema },
      { name: DeceRegistro.name, schema: DeceRegistroSchema },
    ]),
    StudentsModule,
    NotificationsModule,
  ],
  controllers: [DeceController],
  providers: [DeceService],
})
export class DeceModule {}
