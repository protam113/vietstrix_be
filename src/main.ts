import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigType } from './configs/app';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
// Change the import style for cookie-parser
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<AppConfigType>>(ConfigService);
  const port = configService.get<number>('port') || 8083;

  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', // Add this line
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Important for data transformation
    }),
  );

  await app.listen(process.env.PORT || 8080, '0.0.0.0');

  console.log(`🚀 App running: http://localhost:${port}`);
}

bootstrap();
