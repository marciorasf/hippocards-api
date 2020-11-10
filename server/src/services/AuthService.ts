import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

import { UserAuth } from "../interfaces/AuthInterface";

const prisma = new PrismaClient();

class AuthService {
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
        token: this.generateJwt(user.id),
      };
    }

    throw new Error("WRONG_PASSWORD");
  }

  generateJwt(userId: number) {
    return jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 86400,
    });
  }
}

export default new AuthService();
