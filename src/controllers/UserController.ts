import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";
import UserService from "../services/UserService";

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
        message: error.code === "P2002" ? "email_in_use" : "error",
      });
    }
  }

  async updatePassword(request: Request, response: Response) {
    const { newPassword } = request.body;
    const { user } = response.locals;

    try {
      await UserService.updatePassword(user.id, newPassword);
      return ResponseService.noContent(response);
    } catch (error) {
      return ResponseService.badRequest(response, { message: "password_not_updated" });
    }
  }
}

export default new UserController();
