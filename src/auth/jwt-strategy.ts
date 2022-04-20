import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { config } from '@config';

import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const extracted = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (!extracted)
          throw new ForbiddenException(
            'Access token is missing, invalid or expired',
          );
        return extracted;
      },
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new ForbiddenException(
        'Access token is missing, invalid or expired',
      );
    }

    return user;
  }
}
