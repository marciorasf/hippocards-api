import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import ResponseService from "../services/ResponseService";

const secret = process.env.SECRET;

// TODO extract here
function verifyToken(request) {}

export default function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers["x-access-token"];

  if (!token) {
    return ResponseService.badRequest(response, { message: "MISSING_TOKEN" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return ResponseService.unauthorized(response);
    }

    request.userId = decoded.userId;
    next();
  });
}
