import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Image } from '../image/image.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  perex?: string;

  @Column({ name: 'imageId', nullable: true })
  imageId?: string;
  // Article n..1 Image
  @ManyToOne(() => Image, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'imageId' })
  image?: Image;

  @Column()
  content: string;

  // Article 1..n Comment
  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  comments: Comment[];
}
