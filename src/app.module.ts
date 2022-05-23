import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApiKeyMiddleware } from './middleware/api-key.middleware';

import { CustomTypeOrmModule } from './persistance/persistance';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TenantModule } from './tenant/tenant.module';
import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
import { ImageModule } from './image/image.module';
import { ImageController } from './image/image.controller';

@Module({
  imports: [
    CustomTypeOrmModule(),
    ArticleModule,
    TenantModule,
    AuthModule,
    CommentModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        ArticleController,
        AuthController,
        CommentController,
        ImageController,
      );
  }
}
