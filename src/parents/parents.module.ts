import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parent.name, schema: ParentSchema },
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}
