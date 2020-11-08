import { Request } from "express";

import { User } from "./UserInterface";

export interface AuthReq extends Request {
  userId: number;
}

export interface UserAuth extends User {
  password: string;
}
