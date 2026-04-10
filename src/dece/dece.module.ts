import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeceService } from './dece.service';
import { DeceController } from './dece.controller';
import { DeceExpediente, DeceExpedienteSchema } from './schemas/dece-expediente.schema';
import { DeceRegistro, DeceRegistroSchema } from './schemas/dece-registro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeceExpediente.name, schema: DeceExpedienteSchema },
      { name: DeceRegistro.name, schema: DeceRegistroSchema },
    ]),
  ],
  controllers: [DeceController],
  providers: [DeceService],
})
export class DeceModule {}
