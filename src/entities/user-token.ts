import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./user";

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  expiresIn: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
