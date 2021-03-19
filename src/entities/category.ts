import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from "typeorm";

import { Flashcard } from "./flashcard";
import { User } from "./user";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.categories)
  user!: User;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.category)
  flashcards: Flashcard[];
}
