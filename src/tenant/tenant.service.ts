import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InsertTenantDto } from './dto/insert-tenant.dto';

import { Tenant } from './tenant.entity';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantRepository)
    private tenantRepository: TenantRepository,
  ) {}

  async insertTenant(insertTenantDto: InsertTenantDto): Promise<Tenant> {
    return this.tenantRepository.insertTenant(insertTenantDto);
  }

  async getTenantById(tenantId: string): Promise<Tenant> {
    return await this.tenantRepository.getTenantById(tenantId);
  }
}
