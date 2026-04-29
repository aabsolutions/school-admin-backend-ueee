import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleConfig, RoleConfigSchema } from './schemas/role-config.schema';
import { RoleConfigService } from './role-config.service';
import { RoleConfigController } from './role-config.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleConfig.name, schema: RoleConfigSchema }]),
  ],
  controllers: [RoleConfigController],
  providers: [RoleConfigService],
  exports: [RoleConfigService],
})
export class RoleConfigModule {}
