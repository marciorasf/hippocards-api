import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import { UserAuth } from "../interfaces/UserInterface";
import ErrorService from "../services/ErrorService";
import MailService from "../services/MailService";
import UserService from "../services/UserService";

class UserController {
  public async create(request: Request, response: Response) {
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

  public async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserAuth = { email, password };

    try {
      const { user, token } = await UserService.authenticate(payload);

      return response.status(200).json({ user, token });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: error.message,
      });
    }
  }

  public async recoverPassword(request: Request, response: Response) {
    const email = request.query.email as string;

    const existsUser = await UserService.existsUserWithEmail(email);
    if (!existsUser) {
      return response.status(404).json({ message: "USER_NOT_FOUND" });
    }

    const newPassword = UserService.generateRandomPassword();

    try {
      await UserService.updatePassword({ email, password: newPassword });

      await MailService.sendRecoverPasswordEmail({ userEmail: email, newPassword });

      return response.status(204).json({ message: "EMAIL_SENDED" });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({ message: "ERROR" });
    }
  }
}

export default new UserController();
