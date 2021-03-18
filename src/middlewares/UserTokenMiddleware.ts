import { Response, NextFunction, Request } from "express";

import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";
import UserTokenService from "../services/UserTokenService";

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
