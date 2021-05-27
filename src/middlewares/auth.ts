import { Response, NextFunction, Request } from "express";

import ErrorService from "@services/error";
import ResponseService from "@services/response";
import tokenService from "@services/token";

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    ResponseService.unauthorized(response, { message: "unauthorized" });
  } else {
    const token = authorization.replace("Bearer ", "");

    try {
      const decoded = tokenService.verify(token) as Record<"userId", number>;
      response.locals.userId = decoded.userId;

      next();
    } catch (err) {
      ErrorService.handle(err);

      ResponseService.unauthorized(response);
    }
  }
}
