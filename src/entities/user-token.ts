import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";

import { User } from "./user";

@Entity()
export class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  token!: string;

  @Column()
  expiresIn: string;

  @ManyToOne(() => User, (user) => user.categories)
  user!: User;
}
