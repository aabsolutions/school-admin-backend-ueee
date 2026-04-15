import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaEstudioService } from './area-estudio.service';
import { AreaEstudioController } from './area-estudio.controller';
import { AreaEstudio, AreaEstudioSchema } from './schemas/area-estudio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AreaEstudio.name, schema: AreaEstudioSchema }]),
  ],
  controllers: [AreaEstudioController],
  providers: [AreaEstudioService],
  exports: [AreaEstudioService],
})
export class AreaEstudioModule {}
