import { isUUID } from 'class-validator';
import * as passport from 'passport';

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: any) {
    const unauthorizedException = new UnauthorizedException(
      'API key missing or invalid',
    );
    // check if api key is valid UUID
    if (!isUUID(req.headers['x-api-key'])) throw unauthorizedException;

    await passport.authenticate(
      'headerapikey',
      { session: false },
      (validated: boolean) => {
        return next(validated === true ? null : unauthorizedException);
      },
    )(req, res, next);
  }
}
