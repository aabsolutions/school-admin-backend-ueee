import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoLectivoService } from './curso-lectivo.service';
import { CursoLectivoController } from './curso-lectivo.controller';
import { CursoLectivo, CursoLectivoSchema } from './schemas/curso-lectivo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CursoLectivo.name, schema: CursoLectivoSchema }])],
  controllers: [CursoLectivoController],
  providers: [CursoLectivoService],
  exports: [CursoLectivoService],
})
export class CursoLectivoModule {}
