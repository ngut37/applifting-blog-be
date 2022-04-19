import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { InsertTenantDto } from './dto/insert-tenant.dto';

import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async insertTenant(
    @Body() insertTenantDto: InsertTenantDto,
  ): Promise<Tenant> {
    return await this.tenantService.insertTenant(insertTenantDto);
  }

  @Get('/:id')
  async getTenantById(@Param('id') id: string): Promise<Tenant> {
    return await this.tenantService.getTenantById(id);
  }
}
