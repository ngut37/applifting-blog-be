import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { InsertTenantDto } from './dto/insert-tenant.dto';

import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  insertTenant(@Body() insertTenantDto: InsertTenantDto): Promise<Tenant> {
    return this.tenantService.insertTenant(insertTenantDto);
  }

  @Get('/:id')
  getTenantById(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.getTenantById(id);
  }
}
