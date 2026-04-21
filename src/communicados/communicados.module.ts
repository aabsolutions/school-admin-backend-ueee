import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunicadosService } from './communicados.service';
import { CommunicadosController } from './communicados.controller';
import { Communicado, CommunicadoSchema } from './schemas/communicado.schema';
import { Parent, ParentSchema } from '../parents/schemas/parent.schema';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Communicado.name, schema: CommunicadoSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [CommunicadosController],
  providers: [CommunicadosService],
  exports: [CommunicadosService],
})
export class CommunicadosModule {}
