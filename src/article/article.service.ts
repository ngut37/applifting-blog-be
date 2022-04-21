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

  async getArticleById(id: Article['id']): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(id);

    if (!foundArticle) {
      throw new NotFoundException(`Article with ID "${id}" does not exist`);
    }

    return foundArticle;
  }

  async insertArticle(article: InsertArticleDto): Promise<Article> {
    return await this.articleRepository.insertArticle(article);
  }

  async deleteArticle(id: Article['id']): Promise<void> {
    const deleteResult = await this.articleRepository.deleteArticleById(id);

    if (!deleteResult.affected)
      throw new NotFoundException(`Article with ID "${id}" does not exist`);
  }

  async updateArticleById(
    id: Article['id'],
    articleUpdates: UpdateArticleDto,
  ): Promise<Article> {
    const updatedArticle = await this.articleRepository.updateArticleById(
      id,
      articleUpdates,
    );

    if (!updatedArticle)
      throw new NotFoundException(`Article with ID "${id}" does not exist`);

    return updatedArticle;
  }
}
