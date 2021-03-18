import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Category } from "./category";
import { Flashcard } from "./flashcard";
import { UserToken } from "./user-token";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Flashcard, (flashcard) => flashcard)
  flashcards: Flashcard[];

  @OneToMany((_type) => Category, (category) => category)
  categories: Category[];

  @OneToMany((_type) => UserToken, (userToken) => userToken)
  userTokens: UserToken[];
}
