import { createConnection } from "typeorm";
import "reflect-metadata";

import { __postgres_url__ } from "./config/postgres";
import entities from "./entities";

createConnection({
  type: "postgres",
  url: __postgres_url__,
  entities,
  synchronize: true,
  logging: false,
});
