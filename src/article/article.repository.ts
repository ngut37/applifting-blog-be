import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import { Article } from './article.entity';
import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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
    id: Article['articleId'],
    updates: UpdateArticleDto,
  ): Promise<Article | null> {
    let foundArticle = await this.findOne(id);

    if (!foundArticle) return null;

    foundArticle = {
      ...foundArticle,
      ...updates,
    };

    return await this.save(foundArticle);
  }
}
