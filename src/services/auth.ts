import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../entities/user";
import { __secret__, __cookies__ } from "../env-variables";

type AuthData = {
  email: string;
  password: string;
};

class AuthService {
  async authenticate({ email, password }: AuthData) {
    const user = await User.findOne({ where: { email } });

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
