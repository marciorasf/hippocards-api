import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import ErrorService from "../services/ErrorService";
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
}

export default new UserController();
