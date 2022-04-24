import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { config } from '@config';

import { TenantRepository } from '../tenant/tenant.repository';

import { JwtStrategy } from './jwt-strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.JWT_EXPIRATION,
      },
    }),
    TypeOrmModule.forFeature([TenantRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
