import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthRequest } from "../interfaces/AuthInterface";
import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";

const secret = process.env.SECRET;

export default async function AuthMiddleware(
  request: AuthRequest,
  response: Response,
  next: NextFunction
) {
  const token = request.headers["x-access-token"] as string;

  if (!token) {
    return ResponseService.badRequest(response, { message: "MISSING_TOKEN" });
  }

  // eslint-disable-next-line
  jwt.verify(token, secret, function (error, decoded: any) {
    if (error) {
      ErrorService.handleError(error);

      return ResponseService.unauthorized(response);
    }

    request.userId = decoded.userId;
    next();
  });
}
