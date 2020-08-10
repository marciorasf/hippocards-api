import { Request, Response } from "express";

import { UserCreate } from "../interfaces/UserInterface";
import UserService from "../services/UserService";

class UserController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserCreate = { email, password };

    const user = await UserService.create(payload);

    return response.status(201).json({
      user_id: user.id,
    });
  }
}

export default new UserController();
