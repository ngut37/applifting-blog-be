import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InsertTenantDto } from './dto/insert-tenant.dto';
import { Tenant } from './tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends Repository<Tenant> {
  async insertTenant(insertTenantDto: InsertTenantDto) {
    const createdTenant = this.create(insertTenantDto);

    return await this.save(createdTenant);
  }

  async getTenantById(tenantId: string) {
    const foundTenant = await this.findOne(tenantId);

    if (!foundTenant)
      throw new NotFoundException(`Tenant with ID ${tenantId} does not exist`);

    return foundTenant;
  }
}
