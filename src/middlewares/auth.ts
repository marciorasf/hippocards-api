import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { __cookies__, __secret__ } from "../config";
import ErrorService from "../services/error";
import ResponseService from "../services/response";

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.cookies[__cookies__.auth.name];

  if (!token) {
    ResponseService.unauthorized(response, { message: "unauthorized" });
  } else {
    try {
      const decoded = jwt.verify(token, __secret__) as Record<"userId", number>;
      response.locals.userId = decoded.userId;

      next();
    } catch (error) {
      ErrorService.handleError(error);

      ResponseService.unauthorized(response);
    }
  }
}
