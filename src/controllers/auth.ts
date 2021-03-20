import { Request, Response } from "express";

import authService from "../services/auth";
import errorService from "../services/error";
import responseService from "../services/response";

const authController = {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const { user, token } = await authService.authenticate({
        email,
        password,
      });

      authService.setCookie(response, token);

      return responseService.ok(response, { user });
    } catch (error) {
      errorService.handleError(error);
      return responseService.badRequest(response, { message: error.message });
    }
  },

  async logout(_request: Request, response: Response) {
    try {
      authService.clearCookie(response);
      return responseService.noContent(response);
    } catch (error) {
      errorService.handleError(error);
      return responseService.badRequest(response, { message: error.message });
    }
  },

  async ok(_request: Request, response: Response) {
    return responseService.noContent(response);
  },
};

export default authController;
