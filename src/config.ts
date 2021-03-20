import "dotenv/config";
import { CookieOptions } from "express";

export const __node_env__ = process.env.NODE_ENV;
export const __is_dev_env__ = __node_env__ === "development";

export const __port__ = process.env.PORT;

export const __secret__ = process.env.SECRET as string;
export const __salt_rounds__ = process.env.SALT_ROUNDS;

type Cookies = {
  auth: {
    name: string;
    options: CookieOptions;
  };
};

export const __cookies__: Cookies = {
  auth: {
    name: "@flashcards/auth-token",
    options: {
      httpOnly: true,
    },
  },
};

export const __database_url__ = process.env.DATABASE_URL;
