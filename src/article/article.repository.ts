import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { Article } from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticle(insertArticleDto: InsertArticleDto) {
    const createdArticle = this.create(insertArticleDto);

    return await this.save(createdArticle);
  }

  async deleteArticleById(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }

  async updateArticleById(
    id: Article['id'],
    updates: UpdateArticleDto,
  ): Promise<Article | undefined> {
    const foundArticle = await this.findOne(id);

    if (!foundArticle) return undefined;

    return await this.save({ ...foundArticle, ...updates });
  }
}
