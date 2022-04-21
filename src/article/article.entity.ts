import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from '../comment/comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  perex?: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  content: string;

  // Article 1..n Comment
  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  comments: Comment[];
}
