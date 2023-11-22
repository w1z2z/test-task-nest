import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { News } from '../../news/entities/news.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => News, (news: News) => news.author)
  news: News[];
}
