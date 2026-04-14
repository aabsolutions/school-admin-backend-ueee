import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso, CursoSchema } from './schemas/curso.schema';
import { MateriasModule } from '../materias/materias.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Curso.name, schema: CursoSchema }]),
    MateriasModule,
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService],
})
export class CursosModule {}
