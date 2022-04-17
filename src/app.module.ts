import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from '@config';

import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.PG_HOST,
      port: parseInt(config.PG_PORT),
      username: config.PG_USER,
      password: config.PG_PASSWORD,
      database: config.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // ! TODO - set to false for production env
    }),
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
