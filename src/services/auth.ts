import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { __cookies__ } from "../config/cookies";
import { __secret__ } from "../config/encrypt";
import userService from "./user";

type AuthData = {
  email: string;
  password: string;
};

const authService = {
  async authenticate({ email, password }: AuthData) {
    const user = await userService.retrieveOne({ email });

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
  },

  setCookie(response: Response, token: string) {
    response.cookie(__cookies__.auth.name, token, __cookies__.auth.options);
  },

  clearCookie(response: Response) {
    response.clearCookie(__cookies__.auth.name);
  },

  generateJwt(userId: number) {
    return jwt.sign({ userId }, __secret__, {
      expiresIn: 86400,
    });
  },
};

export default authService;
