import jwt from "jsonwebtoken";

import { __secret__ } from "@config/encrypt";

export default function generateToken(data: any, expiresInSeconds?: number) {
  return jwt.sign(data, __secret__, {
    expiresIn: expiresInSeconds,
  });
}
