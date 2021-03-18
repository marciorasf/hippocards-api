import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";

import { Flashcard } from "./flashcard";
import { User } from "./user";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((_type) => User, (user) => user)
  user: User;

  @OneToMany((_type) => Flashcard, (flashcard) => flashcard)
  flashcards: Flashcard[];
}
