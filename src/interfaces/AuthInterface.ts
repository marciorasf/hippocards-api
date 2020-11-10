import { Request } from "express";

export interface AuthRequest extends Request {
  userId: number;
}

export interface UserAuth {
  email: string;
  password: string;
}
