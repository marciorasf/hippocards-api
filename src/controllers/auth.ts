import { Request, Response } from "express";

import authService from "../services/auth";
import errorService from "../services/error";
import responseService from "../services/response";
import userService from "../services/user";

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
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: err.message });
    }
  },

  async logout(_request: Request, response: Response) {
    try {
      authService.clearCookie(response);
      return responseService.noContent(response);
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: err.message });
    }
  },

  async ok(_request: Request, response: Response) {
    const { userId } = response.locals;
    try {
      const user = await userService.retrieveOne({ id: userId });

      delete user?.password;

      return responseService.ok(response, { user });
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: "user_not_retrieved" });
    }
  },
};

export default authController;
