import { Request, Response } from "express";

import { User } from "../interfaces/UserInterface";
import UserService from "../services/UserService";

class UserController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const user: User = { email };

    const [user_id] = await UserService.create(user);

    return response.status(201).json({
      user_id,
    });
  }
}

export default new UserController();
