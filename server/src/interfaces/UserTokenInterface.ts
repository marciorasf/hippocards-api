import { Response } from "express";

import { User } from "@prisma/client";

export interface UserTokenResponse extends Response {
  user: User;
}
