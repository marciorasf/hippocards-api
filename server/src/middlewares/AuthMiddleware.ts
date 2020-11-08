import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

// TODO extract here
function verifyToken(request) {}

export default function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers["x-access-token"];

  if (!token) {
    return response.status(403).json({
      message: "MISSING_TOKEN",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({
        message: "Unauthorized!",
      });
    }
    request.userId = decoded.userId;
    next();
  });
}
