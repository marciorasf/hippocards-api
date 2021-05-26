import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
  UpdateDateColumn,
} from "typeorm";

import { Category } from "./category";
import { User } from "./user";

@Entity()
export class Flashcard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column()
  answer!: string;

  @Column({ default: false })
  isBookmarked!: boolean;

  @Column({ default: false })
  isKnown!: boolean;

  @Column({ default: 0 })
  views!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.flashcards, {
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToOne(() => Category, (category) => category.flashcards, {
    onDelete: "CASCADE",
  })
  category!: Category;
}
