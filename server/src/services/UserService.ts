import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient, UserCreateInput } from "@prisma/client";

import { UserAuth } from "../interfaces/UserInterface";

const prisma = new PrismaClient();

class UserService {
  public async create(user: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));
    return prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  public async authenticate({ email, password }: UserAuth) {
    const user = await prisma.user.findOne({ where: { email } });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      return {
        user: {
          id: user.id,
          email: user.email,
        },
        token: this.generateToken(user.id),
      };
    }

    throw new Error("WRONG_PASSWORD");
  }

  private generateToken(userId: number) {
    return jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 86400,
    });
  }
}

export default new UserService();
