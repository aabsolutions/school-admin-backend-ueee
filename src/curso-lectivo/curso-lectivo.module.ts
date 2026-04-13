import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoLectivoService } from './curso-lectivo.service';
import { CursoLectivoController } from './curso-lectivo.controller';
import { CursoLectivo, CursoLectivoSchema } from './schemas/curso-lectivo.schema';
import { TeachersModule } from '../teachers/teachers.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CursoLectivo.name, schema: CursoLectivoSchema }]),
    TeachersModule,
    EnrollmentsModule,
  ],
  controllers: [CursoLectivoController],
  providers: [CursoLectivoService],
  exports: [CursoLectivoService],
})
export class CursoLectivoModule {}
