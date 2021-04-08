import { CookieOptions } from "express";

type Cookies = {
  auth: {
    name: string;
    options: CookieOptions;
  };
};

export const __cookies__: Cookies = {
  auth: {
    name: "flashcards_auth-token",
    options: {
      httpOnly: true,
    },
  },
};
