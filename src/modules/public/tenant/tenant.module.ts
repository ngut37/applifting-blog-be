import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiKeyStrategy } from './api-key.strategy';

import { TenantController } from './tenant.controller';
import { TenantRepository } from './tenant.repository';
import { TenantService } from './tenant.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService, ApiKeyStrategy],
  imports: [TypeOrmModule.forFeature([TenantRepository]), PassportModule],
})
export class TenantModule {}
