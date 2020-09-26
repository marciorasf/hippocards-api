import { Request, Response } from "express";

import { UserCreateInput } from "@prisma/client";

import { UserAuth } from "../interfaces/UserInterface";
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
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new UserController();
