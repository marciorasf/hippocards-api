import "dotenv/config";

export const __node_env__ = process.env.NODE_ENV;
export const __is_dev_env__ = __node_env__ === "development";

export const __port__ = process.env.PORT;

export const __secret__ = process.env.SECRET as string;
export const __salt_rounds__ = process.env.SALT_ROUNDS;

export const __cookies__ = {
  auth: {
    name: "@flashcards/auth-token",
    options: {},
  },
};

export const __database_url__ = process.env.DATABASE_URL;
