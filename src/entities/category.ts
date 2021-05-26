import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Flashcard } from "./flashcard";
import { User } from "./user";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.category)
  flashcards: Flashcard[];
}
