import { Request } from 'express';

import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';

import { TenantAuthenticationDto } from '../tenant/dto/tenant-authentication.dto';
import { Tenant } from '../tenant/tenant.entity';

import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(tenantAuthenticationDto);
  }

  @Get('/me')
  @UseGuards(new JwtAuthGuard({ passthrough: true }))
  async me(@Req() req: Request): Promise<JwtPayload> {
    const tenant = req.user as Tenant;
    if (tenant && tenant.name && tenant.id) {
      return { name: tenant.name };
    }
  }
}
