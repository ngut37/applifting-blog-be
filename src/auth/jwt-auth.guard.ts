import { JsonWebTokenError } from 'jsonwebtoken';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private options?: { passthrough: boolean }) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (this.options?.passthrough) {
      return user;
    }
    if (info instanceof JsonWebTokenError || !user) {
      throw new ForbiddenException(
        'Access token is missing, invalid or expired',
      );
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
