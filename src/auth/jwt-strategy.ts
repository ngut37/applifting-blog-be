import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { config } from '@config';

import { JwtPayload } from './jwt-payload.interface';

import { TenantRepository } from '../tenant/tenant.repository';
import { Tenant } from '../tenant/tenant.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TenantRepository)
    private tenantRepository: TenantRepository,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const extracted = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return extracted;
      },
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<Tenant> {
    const { name } = payload;
    const tenant = await this.tenantRepository.findOne({ name });

    if (!tenant) {
      throw new ForbiddenException(
        'Access token is missing, invalid or expired',
      );
    }

    return tenant;
  }
}
