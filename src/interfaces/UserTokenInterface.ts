import { Request } from "express";

import { User } from "@prisma/client";

export interface UserTokenRequest extends Request {
  user: User;
}
