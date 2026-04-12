import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentalDocenteService } from './documental-docente.service';
import { DocumentalDocenteController } from './documental-docente.controller';
import {
  DocumentalDocente,
  DocumentalDocenteSchema,
} from './schemas/documental-docente.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentalDocente.name, schema: DocumentalDocenteSchema },
    ]),
    CloudinaryModule,
    TeachersModule,
  ],
  controllers: [DocumentalDocenteController],
  providers: [DocumentalDocenteService],
})
export class DocumentalDocenteModule {}
