import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { InsertCommentDto } from './dto/insert-comment.dto';

import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async insertComment(
    @Body() insertCommentDto: InsertCommentDto,
  ): Promise<Comment> {
    return await this.commentService.insertComment(insertCommentDto);
  }

  @Post('/:id/vote/up')
  async upvoteComment(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.commentService.upvote(id);
  }

  @Post('/:id/vote/down')
  async downvote(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.commentService.downvote(id);
  }
}
