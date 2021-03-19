import { Request, Response } from "express";

import ErrorService from "../services/error";
import ResponseService from "../services/response";
import UserService from "../services/user";

class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await UserService.create({
        email,
        password,
      });

      return ResponseService.created(response, { userId: user.id });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.badRequest(response, {
        message: error.code === "23505" ? "email_in_use" : "error",
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
