import { Request, Response } from "express";

import { UserAuth } from "../interfaces/auth";
import AuthService from "../services/auth";
import ErrorService from "../services/error";
import ResponseService from "../services/response";

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const payload: UserAuth = { email, password };

    try {
      const { user, token } = await AuthService.authenticate(payload);

      AuthService.setCookie(response, token);

      return ResponseService.ok(response, { user });
    } catch (error) {
      AuthService.clearCookie(response);

      ErrorService.handleError(error);

      return ResponseService.badRequest(response, { message: error.message });
    }
  }
}

export default new AuthenticationController();
