import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TenantAuthenticationDto } from './dto/tenant-authentication.dto';

import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async insertTenant(
    @Body() tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<Tenant> {
    return await this.tenantService.insertTenant(tenantAuthenticationDto);
  }

  @Get('/:id')
  async getTenantById(@Param('id') id: Tenant['id']): Promise<Tenant> {
    return await this.tenantService.getTenantById(id);
  }
}
