import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { ImageRepository } from '../image/image.repository';
import { Image } from '../image/image.entity';

import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

import { InsertArticleDto } from './dto/insert-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  async listArticles(
    options: IPaginationOptions,
  ): Promise<Pagination<Article>> {
    return paginate(this.articleRepository, options);
  }

  async getArticleById(id: Article['id']): Promise<Article> {
    const foundArticle = await this.articleRepository.findOne(id);

    if (!foundArticle) {
      throw new NotFoundException(`Article with ID ${id} does not exist`);
    }

    return foundArticle;
  }

  async insertArticle(insertArticleDto: InsertArticleDto): Promise<Article> {
    let foundImage: Image | undefined = undefined;

    if (insertArticleDto.imageId) {
      const { imageId } = insertArticleDto;
      foundImage = await this.imageRepository.findOne(imageId);

      if (!foundImage)
        throw new NotFoundException(`Image with ID ${imageId} does not exist`);
    }

    return await this.articleRepository.insertArticle(
      insertArticleDto,
      foundImage,
    );
  }

  async deleteArticle(id: Article['id']): Promise<void> {
    const deleteResult = await this.articleRepository.delete(id);

    if (!deleteResult.affected)
      throw new NotFoundException(`Article with ID ${id} does not exist`);
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
      throw new NotFoundException(`Article with ID ${id} does not exist`);

    return updatedArticle;
  }
}
