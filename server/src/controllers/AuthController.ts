import { Request, Response } from "express";

import { UserAuth } from "../interfaces/AuthInterface";
import AuthService from "../services/AuthService";
import ErrorService from "../services/ErrorService";

class AuthenticationController {
  public async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserAuth = { email, password };

    try {
      const { user, token } = await AuthService.authenticate(payload);

      return response.status(200).json({ user, token });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new AuthenticationController();
