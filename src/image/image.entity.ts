import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Article } from '../article/article.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'bytea',
  })
  file: Uint8Array;

  // 1..n
  @OneToMany(() => Article, (article) => article.image)
  articles: Article[];
}
