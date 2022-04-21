import { Injectable, NotFoundException } from '@nestjs/common';

import { ArticleRepository } from '../article/article.repository';

import { InsertCommentDto } from './dto/insert-comment.dto';

import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private articleRepository: ArticleRepository,
  ) {}

  async insertComment(insertCommentDto: InsertCommentDto): Promise<Comment> {
    const { articleId } = insertCommentDto;
    const foundArticle = await this.articleRepository.findOne(articleId);

    if (!foundArticle)
      throw new NotFoundException(
        `Article with ID "${articleId}" does not exist`,
      );

    return await this.commentRepository.insertComment(
      insertCommentDto,
      foundArticle,
    );
  }

  async upvote(id: Comment['id']): Promise<void> {
    const res = await this.commentRepository.increment({ id }, 'score', 1);
    if (!res.affected)
      throw new NotFoundException(`Comment with ID ${id} does not exist`);
  }

  async downvote(id: Comment['id']): Promise<void> {
    const res = await this.commentRepository.decrement({ id }, 'score', 1);
    if (!res.affected)
      throw new NotFoundException(`Comment with ID ${id} does not exist`);
  }
}
