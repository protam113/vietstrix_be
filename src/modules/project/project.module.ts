import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemLogModule } from '../system-log/system-log.module';
import { SlugProvider } from '../slug/slug.provider';
import { RedisCacheModule } from '../cache/redis-cache.module';
import { ProjectEntity, ProjectSchema } from '../../entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MediaModule } from '../media/media.module';
import { AuthModule } from '../auth/auth.module';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectEntity.name, schema: ProjectSchema },
    ]),
    SystemLogModule,
    RedisCacheModule,
    MediaModule,
    AuthModule,
    ServiceModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, SlugProvider],
  exports: [ProjectService],
})
export class ProjectModule {}
