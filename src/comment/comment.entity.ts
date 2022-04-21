import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Article } from '../article/article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'articleId' })
  articleId: number;
  // Comment n..1 Article
  @ManyToOne(() => Article, (article) => article.comments, { eager: false })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column('text')
  author: string;

  @Column('text')
  content: string;

  @Column({ type: 'int', default: 0 })
  score: string;
}
