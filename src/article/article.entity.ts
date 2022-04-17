import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  articleId: string;

  @Column()
  title: string;

  @Column()
  perex?: string;

  @Column()
  imageId?: string;

  @Column()
  content: string;
}
