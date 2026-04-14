import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CargaHorariaService } from './carga-horaria.service';
import { CargaHorariaController } from './carga-horaria.controller';
import { CargaHoraria, CargaHorariaSchema } from './schemas/carga-horaria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CargaHoraria.name, schema: CargaHorariaSchema }]),
  ],
  controllers: [CargaHorariaController],
  providers: [CargaHorariaService],
  exports: [CargaHorariaService],
})
export class CargaHorariaModule {}
