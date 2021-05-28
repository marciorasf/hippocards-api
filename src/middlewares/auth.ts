import { Response, NextFunction, Request } from "express";

import ResponseService from "@services/response";
import tokenService from "@services/token";

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    ResponseService.unauthorized(response, { message: "unauthorized" });
  } else {
    const token = authorization.replace("Bearer ", "");

    const decoded = tokenService.verify(token) as Record<"userId", number>;
    if (!decoded) {
      return ResponseService.unauthorized(response);
    }

    response.locals.userId = decoded.userId;

    return next();
  }
}
