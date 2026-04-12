import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
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
import { DocumentalEstudianteModule } from './documental-estudiante/documental-estudiante.module';
import { DocumentalDocenteModule } from './documental-docente/documental-docente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('3600s'),
        CORS_ORIGIN: Joi.string().default('http://localhost:4200'),
        CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
        CLOUDINARY_API_KEY: Joi.string().optional(),
        CLOUDINARY_API_SECRET: Joi.string().optional(),
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 60 }],
    }),
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
    DocumentalEstudianteModule,
    DocumentalDocenteModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
