import { CacheModule } from '@nestjs/cache-manager';
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppBaseController } from './app.base.controller';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';
import { AppService } from './app.service';
import { RedisCacheModule } from 'src/modules/cache/redis-cache.module';
import { ApiKeyMiddleware } from 'src/middlewares/api-key.middleware';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CorsMiddleware } from 'src/middlewares/cors.middleware';
import { RequestLoggerMiddleware } from 'src/middlewares/request-logger.middleware';
import { RateLimitMiddleware } from 'src/middlewares/rate-limiter.middleware';
import { JwtCookieMiddleware } from 'src/middlewares/jwt-cookie.middleware';
import { MediaModule } from 'src/modules/media/media.module';
import { BlogModule } from 'src/modules/blog/blog.module';
import { ServiceModule } from 'src/modules/service/service.module';
import { RolesGuard } from 'src/modules/auth/guards/RolesGuard';
import { ProjectModule } from 'src/modules/project/project.module';
import { SeoModule } from 'src/modules/seo/seo.module';
import { HealthModule } from 'src/modules/health/health.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { SystemLogModule } from 'src/modules/system-log/system-log.module';
import { TrackingModule } from 'src/modules/tracking/tracking.module';
import { FaqModule } from 'src/modules/faq/faq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await import('cache-manager-ioredis'),
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        db: configService.get('REDIS_INDEX'),
        ttl: 60,
      }),
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    RedisCacheModule,
    SystemLogModule,
    HealthModule,
    AuthModule,
    UserModule,
    SeoModule,
    MediaModule,
    CategoryModule,
    BlogModule,
    ServiceModule,
    ProjectModule,
    ContactModule,
    TrackingModule,
    FaqModule,
  ],
  controllers: [AppBaseController],
  providers: [
    {
      provide: 'app',
      useClass: AppService,
    },
    ApiKeyMiddleware,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Request logger middleware
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');

    consumer.apply(CorsMiddleware).forRoutes('*');

    consumer
      .apply(ApiKeyMiddleware)

      .forRoutes('*');

    consumer.apply(RateLimitMiddleware).forRoutes('*');

    consumer
      .apply(JwtCookieMiddleware)
      .exclude(
        '/v1/public/auth/login',
        {
          path: '/v1/health',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/seo',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/contact',
          method: RequestMethod.POST,
        },
        {
          path: '/v1/category',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/category/:slug',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/blog',
          method: RequestMethod.GET,
        },
        {
          path: '/blog/:slug',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/service',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/service/:slug',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/project',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/project/:slug',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/tracking/track',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
