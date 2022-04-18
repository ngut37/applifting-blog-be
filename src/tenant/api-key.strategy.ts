import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { TenantRepository } from './tenant.repository';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy<
  typeof HeaderAPIKeyStrategy
>(HeaderAPIKeyStrategy) {
  constructor(
    @InjectRepository(TenantRepository)
    private tenantRepository: TenantRepository,
  ) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      async (apiKey: string, done: any) => {
        const foundTenantByApiKey = await this.tenantRepository.findOne({
          apiKey,
        });

        if (foundTenantByApiKey) {
          foundTenantByApiKey.lastUsedAt = new Date();
          await this.tenantRepository.save(foundTenantByApiKey);
        }

        return done(Boolean(foundTenantByApiKey));
      },
    );
  }
}
