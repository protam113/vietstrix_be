import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CorsMiddleware.name);
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = this.configService
      .get<string>('ALLOWED_ORIGINS')
      ?.split(',') || ['http://localhost:3000'];
    const origin = req.headers.origin;

    this.logger.log(`Request origin: ${origin}`);
    this.logger.log(`Allowed origins: ${allowedOrigins.join(', ')}`);

    // Set common headers
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, Authorization, X-API-KEY, api-key',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Set CORS Origin
    if (process.env.NODE_ENV !== 'production') {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    } else if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
      this.logger.log('CORS preflight request handled');
      res.sendStatus(200);
      return;
    }

    next();
  }
}
