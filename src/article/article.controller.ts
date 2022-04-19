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
} from '@nestjs/common';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  listArticles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.articleService.listArticles({
      page,
      limit: limit > 100 ? 100 : limit,
    });
  }

  @Get('/:id')
  getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  insertArticle(
    @Body() insertedArticleDto: InsertArticleDto,
  ): Promise<Article> {
    return this.articleService.insertArticle(insertedArticleDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArticle(@Param('id') id: string): Promise<void> {
    return this.articleService.deleteArticle(id);
  }

  @Patch('/:id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticleById(id, updateArticleDto);
  }
}
