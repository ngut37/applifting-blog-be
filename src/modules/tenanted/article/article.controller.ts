import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async listArticles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.articleService.listArticles({
      page,
      limit: limit > 100 ? 100 : limit,
    });
  }

  @Get('/:id')
  async getArticleById(@Param('id') id: string): Promise<Article> {
    return await this.articleService.getArticleById(id);
  }

  @Post()
  async insertArticle(
    @Body() insertedArticleDto: InsertArticleDto,
  ): Promise<Article> {
    return await this.articleService.insertArticle(insertedArticleDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(@Param('id') id: string): Promise<void> {
    return await this.articleService.deleteArticle(id);
  }

  @Patch('/:id')
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const updatedArticle = await this.articleService.updateArticleById(
      id,
      updateArticleDto,
    );

    return updatedArticle;
  }
}
