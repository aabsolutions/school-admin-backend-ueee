import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { CursosModule } from './cursos/cursos.module';
import { CursoLectivoModule } from './curso-lectivo/curso-lectivo.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { DeceModule } from './dece/dece.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    CloudinaryModule,
    AuthModule,
    UsersModule,
    DepartmentsModule,
    StudentsModule,
    TeachersModule,
    CoursesModule,
    CursosModule,
    CursoLectivoModule,
    EnrollmentsModule,
    ExpedientesModule,
    DeceModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
