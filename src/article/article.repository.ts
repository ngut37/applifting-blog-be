import { EntityRepository, Repository } from 'typeorm';

import { Image } from '../image/image.entity';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { Article } from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticle(insertArticleDto: InsertArticleDto, image?: Image) {
    const createdArticle = this.create({ ...insertArticleDto, image });

    await this.save(createdArticle);

    if (createdArticle.image) {
      createdArticle.imageId = createdArticle.image.id;
      delete createdArticle.image;
    }

    return createdArticle;
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
