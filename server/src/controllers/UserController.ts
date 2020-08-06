import { Request, Response } from "express";

import db from "../database/connection";

interface User {
  email: string;
}

class UserController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const user: User = { email };
    const [user_id] = await db("users").insert(user);

    return response.status(201).json({
      user_id,
    });
  }
}

export default new UserController();
