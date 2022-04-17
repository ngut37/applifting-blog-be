import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  async listArticles(
    options: IPaginationOptions,
  ): Promise<Pagination<Article>> {
    return paginate(this.articleRepository, options);
  }

  async getArticleById(articleId: Article['articleId']): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(articleId);

    if (!foundArticle) {
      throw new NotFoundException(
        `Article with ID "${articleId}" does not exist.`,
      );
    }

    return foundArticle;
  }

  async insertArticle(article: InsertArticleDto): Promise<Article> {
    return await this.articleRepository.insertArticle(article);
  }

  async deleteArticle(id: Article['articleId']): Promise<void> {
    await this.articleRepository.deleteArticleById(id);
  }

  async updateArticleById(
    id: Article['articleId'],
    articleUpdates: UpdateArticleDto,
  ): Promise<Article> {
    return await this.articleRepository.updateArticleById(id, articleUpdates);
  }
}
