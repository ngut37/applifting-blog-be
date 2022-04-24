import { Controller, Post, Body } from '@nestjs/common';

import { TenantAuthenticationDto } from '../tenant/dto/tenant-authentication.dto';

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
}
