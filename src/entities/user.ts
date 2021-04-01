import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";

import { Category } from "@entities/category";
import { Flashcard } from "@entities/flashcard";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.user)
  flashcards: Flashcard[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
