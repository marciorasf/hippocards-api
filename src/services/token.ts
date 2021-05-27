import jwt from "jsonwebtoken";

import { __secret__ } from "@config/encrypt";

const tokenService = {
  generateToken(data: any, expiresInSeconds: number) {
    return jwt.sign(data, __secret__, {
      expiresIn: expiresInSeconds,
    });
  },

  verify(token) {
    return jwt.verify(token, __secret__)
  }
};

export default tokenService;
