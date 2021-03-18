import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

import { __secret__, __cookies__ } from "../config";
import { UserAuth } from "../interfaces/AuthInterface";

const prisma = new PrismaClient();

class AuthService {
  async authenticate({ email, password }: UserAuth) {
    const user = await prisma.user.findOne({ where: { email } });

    if (!user) {
      throw new Error("user_not_found");
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

    throw new Error("wrong_password");
  }

  setCookie(response: Response, token: string) {
    response.cookie(__cookies__.auth.name, token, __cookies__.auth.options);
  }

  clearCookie(response: Response) {
    response.clearCookie(__cookies__.auth.name);
  }

  generateJwt(userId: number) {
    return jwt.sign({ userId }, __secret__, {
      expiresIn: 86400,
    });
  }
}

export default new AuthService();
