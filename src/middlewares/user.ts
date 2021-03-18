import { Response, NextFunction, Request } from "express";

import ErrorService from "../services/error";
import ResponseService from "../services/response";
import UserTokenService from "../services/user-token";

export default async function UserTokenMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { token } = request.body;

  try {
    const user = await UserTokenService.retrieveUserByUserToken(token);

    if (user) {
      response.locals.user = user;
      next();
    } else {
      ResponseService.badRequest(response, { message: "INVALID_TOKEN" });
    }
  } catch (error) {
    ErrorService.handleError(error);

    ResponseService.internalServerError(response, { error });
  }
}
