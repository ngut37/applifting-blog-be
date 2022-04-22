import { EntityRepository, Repository } from 'typeorm';

import { Article } from '../article/article.entity';

import { InsertCommentDto } from './dto/insert-comment.dto';

import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async insertComment(
    insertComment: InsertCommentDto,
    article: Article,
  ): Promise<Comment> {
    const { author, content } = insertComment;
    const createdComment = new Comment();

    createdComment.author = author;
    createdComment.content = content;
    createdComment.article = article;

    await this.save(createdComment);

    delete createdComment.article;

    return createdComment;
  }
}
