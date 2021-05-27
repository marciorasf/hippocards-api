import { Request, Response } from "express";

import authService from "@services/auth";
import emailService from "@services/email";
import errorService from "@services/error";
import responseService from "@services/response";
import userService from "@services/user";

const authController = {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const { user, token } = await authService.authenticate({
        email,
        password,
      });

      return responseService.ok(response, { user, token });
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: err.message });
    }
  },

  async ok(_request: Request, response: Response) {
    const { userId } = response.locals;
    try {
      const user = await userService.retrieveOne({ id: userId });

      if (!user) {
        return responseService.unauthorized(response);
      }

      delete user?.password;

      return responseService.ok(response, { user });
    } catch (err) {
      errorService.handle(err);
      return responseService.internalServerError(response, { message: "user_not_retrieved" });
    }
  },

  async recoverPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const userExists = await userService.existsUserWithEmail(email);

      if (!userExists) {
        return responseService.notFound(response);
      }

      const token = await userService.addRecoverPasswordTokenAndReturnToken(email);

      await emailService.sendRecoverPasswordMail(email, token);

      return responseService.noContent(response);
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: err.message });
    }
  },
};

export default authController;
