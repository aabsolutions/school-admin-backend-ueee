import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSectionsService } from './class-sections.service';
import { ClassSectionsController } from './class-sections.controller';
import { ClassSection, ClassSectionSchema } from './schemas/class-section.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClassSection.name, schema: ClassSectionSchema }])],
  controllers: [ClassSectionsController],
  providers: [ClassSectionsService],
  exports: [ClassSectionsService],
})
export class ClassSectionsModule {}
