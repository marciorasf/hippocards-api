import { Request, Response } from "express";

import { UserAuth } from "../interfaces/AuthInterface";
import AuthService from "../services/AuthService";
import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserAuth = { email, password };

    try {
      const { user, token } = await AuthService.authenticate(payload);

      return ResponseService.ok(response, { user, token });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.badRequest(response, { message: error.message });
    }
  }
}

export default new AuthenticationController();
