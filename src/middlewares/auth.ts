import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { __secret__ } from "@config/encrypt";
import ErrorService from "@services/error";
import ResponseService from "@services/response";

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    ResponseService.unauthorized(response, { message: "unauthorized" });
  } else {
    const token = authorization.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, __secret__) as Record<"userId", number>;
      response.locals.userId = decoded.userId;

      next();
    } catch (err) {
      ErrorService.handle(err);

      ResponseService.unauthorized(response);
    }
  }
}
