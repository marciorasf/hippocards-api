import { Request, Response } from "express";

import emailService from "@services/email";
import errorService from "@services/error";
import responseService from "@services/response";
import tokenService from "@services/token";
import userService from "@services/user";

const userController = {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await userService.create({
        email,
        password,
      });

      return responseService.created(response, { userId: user.id });
    } catch (err) {
      errorService.handle(err);

      return responseService.badRequest(response, {
        message: err.code === "23505" ? "email_in_use" : "error",
      });
    }
  },

  async updatePassword(request: Request, response: Response) {
    const { newPassword, token } = request.body;

    try {
      const isTokenValid = tokenService.verify(token);
      if (!isTokenValid) {
        return responseService.unauthorized(response, { message: "invalid_token" });
      }

      const user = await userService.retrieveOne({ recoverPasswordToken: token });

      if (!user) {
        return responseService.notFound(response, { message: "user_not_found" });
      }

      await userService.updatePassword(user.id, newPassword);
      return responseService.noContent(response);
    } catch (err) {
      return responseService.badRequest(response, { message: "password_not_updated" });
    }
  },

  async recoverPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const userExists = await userService.existsUserWithEmail(email);

      if (!userExists) {
        return responseService.notFound(response, { message: "user_not_found" });
      }

      const token = await userService.addRecoverPasswordTokenAndReturnToken(email);

      await emailService.sendRecoverPasswordMail(email, token);

      return responseService.noContent(response);
    } catch (err) {
      errorService.handle(err);
      return responseService.badRequest(response, { message: err.message });
    }
  },

  async verifyRecoverPasswordToken(request: Request, response: Response) {
    const { token } = request.params;

    try {
      const decoded = tokenService.verify(token) as Record<"email", string>;
      if (!decoded) {
        return responseService.forbidden(response, { message: "invalid_token" });
      }

      const { email } = decoded;

      const user = userService.retrieveOne({
        email,
        recoverPasswordToken: token,
      });

      if (!user) {
        return responseService.notFound(response);
      }

      return responseService.noContent(response);
    } catch (err) {
      return responseService.internalServerError(response);
    }
  },
};

export default userController;
