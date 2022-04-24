import { IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  perex?: string;

  @IsString()
  @IsOptional()
  imageId?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
