import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('--- Middleware Working [For Books] ---');
    const { ip, method, originalUrl } = req;

    console.log(`Request path: ${originalUrl}`);
    console.log(`IP Address: ${ip}`);
    console.log(`Method: ${method}`);

    if (method === 'PATCH') {
      throw new UnauthorizedException();
    }

    next();
  }
}
