import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const token = request.headers["x-access-token"];

  if (!token) {
    return response.status(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({
        message: "Unauthorized!",
      });
    }
    request.userId = decoded.id;
    next();
  });
}

export default process.env.SECRET;
