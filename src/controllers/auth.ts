import { Request, Response } from "express";

import AuthService from "../services/auth";
import ErrorService from "../services/error";
import ResponseService from "../services/response";

class AuthenticationController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const { user, token } = await AuthService.authenticate({
        email,
        password,
      });

      AuthService.setCookie(response, token);

      return ResponseService.ok(response, { user });
    } catch (error) {
      ErrorService.handleError(error);
      return ResponseService.badRequest(response, { message: error.message });
    }
  }

  async logout(_request: Request, response: Response) {
    try {
      AuthService.clearCookie(response);
      return ResponseService.noContent(response);
    } catch (error) {
      ErrorService.handleError(error);
      return ResponseService.badRequest(response, { message: error.message });
    }
  }

  async ok(_request: Request, response: Response) {
    return ResponseService.noContent(response);
  }
}

export default new AuthenticationController();
