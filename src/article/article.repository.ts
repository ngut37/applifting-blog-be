import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Article } from './article.entity';
import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticle(insertArticleDto: InsertArticleDto) {
    const createdArticle = this.create(insertArticleDto);

    return await this.save(createdArticle);
  }

  async deleteArticleById(id: string): Promise<void> {
    const deleteResult = await this.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Article with ID ${id} does not exist.`);
    }
  }

  async updateArticleById(
    id: Article['articleId'],
    updates: UpdateArticleDto,
  ): Promise<Article> {
    let foundArticle = await this.findOne(id);

    if (!foundArticle) {
      throw new NotFoundException(`Article with ID ${id} does not exist.`);
    }

    foundArticle = {
      ...foundArticle,
      ...updates,
    };

    return await this.save(foundArticle);
  }
}
