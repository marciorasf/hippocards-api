import { Response, NextFunction } from "express";

import { UserTokenRequest } from "../interfaces/UserTokenInterface";
import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";
import UserTokenService from "../services/UserTokenService";

export default async function UserTokenMiddleware(
  request: UserTokenRequest,
  response: Response,
  next: NextFunction
) {
  const { token } = request.body;

  try {
    const user = await UserTokenService.getUserByUserToken(token);

    if (user) {
      request.user = user;
      next();
    } else {
      return ResponseService.badRequest(response, { message: "INVALID_TOKEN" });
    }
  } catch (error) {
    ErrorService.handleError(error);

    return ResponseService.internalServerError(response, { error });
  }
}
