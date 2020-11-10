import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import { UserTokenResponse } from "../interfaces/UserTokenInterface";
import ErrorService from "../services/ErrorService";
import MailService from "../services/MailService";
import ResponseService from "../services/ResponseService";
import UserService from "../services/UserService";
import UserTokenService from "../services/UserTokenService";

class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserCreateInput = { email, password };

    try {
      const user = await UserService.create(payload);

      return ResponseService.created(response, { userId: user.id });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.badRequest(response, {
        message: error.code === "P2002" ? "EMAIL_IN_USE" : "ERROR",
      });
    }
  }

  async updatePassword(request: Request, response: UserTokenResponse) {
    const { newPassword } = request.body;
    const { user } = request;

    try {
      await UserService.updatePassword(user.id, newPassword);
      return ResponseService.noContent(response);
    } catch (error) {
      return ResponseService.badRequest(response, { message: "PASSWORD_NOT_UPDATED" });
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const email = request.query.email as string;

    try {
      const user = await UserService.getByEmail(email);

      if (!user) {
        return ResponseService.notFound(response, { message: "USER_NOT_FOUND" });
      }

      const userToken = await UserTokenService.createForgotPasswordUserToken(user.id);

      if (!userToken) {
        return ResponseService.internalServerError(response, { message: "TOKEN_NOT_CREATED" });
      }

      await MailService.sendForgotPasswordEmail(email, userToken.token);

      return ResponseService.noContent(response);
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "ERROR" });
    }
  }
}

export default new UserController();
