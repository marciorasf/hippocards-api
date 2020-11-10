import { Request, Response, NextFunction } from "express";

import ErrorService from "../services/ErrorService";
import UserTokenService from "../services/UserTokenService";

export default async function UserTokenMiddleware(
  request: Request,
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
      return response.status(401).json({
        message: "INVALID_TOKEN",
      });
    }
  } catch (error) {
    ErrorService.handleError(error);
    return response.status(401).json({
      message: "INTERNAL_ERROR",
    });
  }
}
