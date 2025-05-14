import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../../entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { SystemLogModule } from '../system-log/system-log.module';
import { RedisCacheModule } from '../cache/redis-cache.module';

// Email Service
import { EmailPasswordModule } from 'src/common/email/password_email.module';
import { EmailPasswordService } from 'src/services/email_password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    SystemLogModule,
    EmailPasswordModule,
    RedisCacheModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailPasswordService],
  exports: [UserService],
})
export class UserModule {}
