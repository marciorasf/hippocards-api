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

  public generateRandomPassword() {
    const passwordLength = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charsetLength = charset.length;

    let password = "";
    for (let i = 0; i < passwordLength; i += 1) {
      password += charset.charAt(Math.floor(Math.random() * charsetLength));
    }

    return password;
  }
}

export default new AuthService();
