import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { TenantAuthenticationDto } from './dto/tenant-authentication.dto';

import { Tenant } from './tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends Repository<Tenant> {
  async insertTenant(
    tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<Tenant> {
    const { name, password } = tenantAuthenticationDto;
    const createdTenant = new Tenant();
    createdTenant.name = name;
    createdTenant.salt = await bcrypt.genSalt();
    createdTenant.password = await this.hashPassword(
      password,
      createdTenant.salt,
    );

    try {
      await this.save(createdTenant);
      return this.stripTenant(createdTenant);
    } catch (error) {
      // 23505 = duplicate name
      if (error.code === '23505') {
        throw new ConflictException(
          `A tenant with username "${name}" already exists`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async login(
    tenantAuthenticationDto: TenantAuthenticationDto,
  ): Promise<string> {
    const { name, password } = tenantAuthenticationDto;

    const foundTenant = await this.findOne({ name });

    if (foundTenant && (await foundTenant.validatePassword(password))) {
      return foundTenant.name;
    } else {
      return null;
    }
  }

  async getTenantById(tenantId: string): Promise<Tenant | undefined> {
    const foundTenant = await this.findOne(tenantId);

    return foundTenant ? this.stripTenant(foundTenant) : undefined;
  }

  private stripTenant(tenant: Tenant): Tenant {
    delete tenant.salt;
    delete tenant.password;

    return tenant;
  }

  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}
