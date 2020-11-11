import { Response, NextFunction, Request } from "express";
import * as jwt from "jsonwebtoken";

import { secret } from "../config";
import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";

export default function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers["x-access-token"] as string;

  if (!token) {
    ResponseService.badRequest(response, { message: "MISSING_TOKEN" });
  } else {
    try {
      const decoded = jwt.verify(token, secret) as Record<"userId", number>;
      response.locals.userId = decoded.userId;

      next();
    } catch (error) {
      ErrorService.handleError(error);

      ResponseService.unauthorized(response);
    }
  }
}
