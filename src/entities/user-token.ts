import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  expiresIn: string;
}
