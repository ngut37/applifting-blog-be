import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  articleId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  perex?: string;

  @Column({ type: 'text', nullable: true })
  imageId?: string;

  @Column()
  content: string;
}
