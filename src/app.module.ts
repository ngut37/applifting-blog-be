import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from '@config';

import { ApiKeyMiddleware } from './middleware/api-key.middleware';

import { TenantModule } from './tenant/tenant.module';
import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.PG_HOST,
      port: config.PG_PORT,
      username: config.PG_USER,
      password: config.PG_PASSWORD,
      database: config.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // ! TODO - set to false for production env
    }),
    ArticleModule,
    TenantModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(ArticleController, AuthController);
  }
}
