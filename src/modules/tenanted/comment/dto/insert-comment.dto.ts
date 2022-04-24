import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InsertCommentDto {
  @IsUUID()
  @IsNotEmpty()
  articleId: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
