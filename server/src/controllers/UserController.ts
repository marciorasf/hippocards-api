import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import ErrorService from "../services/ErrorService";
import MailService from "../services/MailService";
import UserService from "../services/UserService";
import UserTokenService from "../services/UserTokenService";

class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserCreateInput = { email, password };

    try {
      const user = await UserService.create(payload);

      return response.status(201).json({
        userId: user.id,
      });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: error.code === "P2002" ? "EMAIL_IN_USE" : "ERROR",
      });
    }
  }

  async updatePassword(request: Request, response: Response) {
    const { newPassword } = request.body;
    const { user } = request;

    try {
      await UserService.updatePassword(user.id, newPassword);
      return response.status(200).json({ message: "ok" });
    } catch (error) {
      return response.status(400).json({ message: "not ok" });
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const email = request.query.email as string;

    try {
      const user = await UserService.getByEmail(email);

      if (!user) {
        return response.status(404).json({ message: "USER_NOT_FOUND" });
      }

      const token = UserTokenService.generateUserTokenToken();

      const userToken = UserTokenService.createUserToken({
        token,
        expiresIn: String(Date.now() + 3600000), // 1 hour
        User: {
          connect: {
            id: user.id,
          },
        },
      });

      if (!userToken) {
        return response.status(400).json({ message: "TOKEN_NOT_CREATED" });
      }

      await MailService.sendForgotPasswordEmail(email, token);

      return response.status(204).json({ message: "EMAIL_SENT" });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({ message: "INTERNAL_ERROR" });
    }
  }
}

export default new UserController();
