import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  perex?: string;

  @IsString()
  @IsOptional()
  imageId?: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
