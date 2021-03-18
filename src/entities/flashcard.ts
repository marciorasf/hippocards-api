import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from "typeorm";

import { Category } from "./category";
import { User } from "./user";

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  isBookmarked: boolean;

  @Column()
  isKnown: boolean;

  @Column()
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne((_type) => User, (user) => user)
  user: User;

  @OneToOne((_type) => Category, (category) => category)
  category: Category;
}
