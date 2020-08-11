import { Request } from "express";

export interface AuthReq extends Request {
  userId: number;
}
