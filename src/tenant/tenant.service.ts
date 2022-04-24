import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TenantAuthenticationDto } from './dto/tenant-authentication.dto';

import { Tenant } from './tenant.entity';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantRepository)
    private tenantRepository: TenantRepository,
  ) {}

  async insertTenant(
    tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<Tenant> {
    return this.tenantRepository.insertTenant(tenantAuthenticationDto);
  }

  async getTenantById(id: Tenant['id']): Promise<Tenant> {
    const foundTenant = await this.tenantRepository.getTenantById(id);

    if (!foundTenant)
      throw new NotFoundException(`Tenant with ID ${id} does not exist`);

    return foundTenant;
  }
}
