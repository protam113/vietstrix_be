import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemLogModule } from '../system-log/system-log.module';
import { SlugProvider } from '../slug/slug.provider';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { RedisCacheModule } from '../cache/redis-cache.module';
import { MediaModule } from '../media/media.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { ServiceEntity, ServiceSchema } from 'src/entities/service.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceEntity.name, schema: ServiceSchema },
    ]),
    SystemLogModule,
    AuthModule,
    MediaModule,
    RedisCacheModule,
    CategoryModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService, SlugProvider],
  exports: [ServiceService],
})
export class ServiceModule {}
