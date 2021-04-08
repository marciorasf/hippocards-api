import { createConnection } from "typeorm";
import "reflect-metadata";

import entities from "@/entities";
import { __is_dev_env__, __is_prod_env__ } from "@config/environment";
import { __postgres_url__ } from "@config/postgres";

createConnection({
  type: "postgres",
  url: __postgres_url__,
  entities,
  synchronize: __is_dev_env__,
  logging: __is_prod_env__,
  ...(__is_prod_env__
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});
