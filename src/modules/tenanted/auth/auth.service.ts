import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TenantAuthenticationDto } from '../tenant/dto/tenant-authentication.dto';
import { TenantRepository } from '../tenant/tenant.repository';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TenantRepository)
    private tenantRepository: TenantRepository,
    private jwtService: JwtService,
  ) {}

  async login(
    tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<{ accessToken: string }> {
    const name = await this.tenantRepository.login(tenantAuthenticationDto);

    if (!name) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: JwtPayload = { name };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
