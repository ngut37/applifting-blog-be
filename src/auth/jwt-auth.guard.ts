import { JsonWebTokenError } from 'jsonwebtoken';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new ForbiddenException(
        'Access token is missing, invalid or expired',
      );
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
