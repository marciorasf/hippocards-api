import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

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

  @ManyToOne(() => User, (user) => user.flashcards)
  user: User;

  @ManyToOne(() => Category, (category) => category.flashcards)
  category: Category;
}
