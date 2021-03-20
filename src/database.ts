import { createConnection } from "typeorm";
import "reflect-metadata";

import { __database_url__ } from "./config";
import entities from "./entities";

createConnection({
  type: "postgres",
  url: __database_url__,
  entities,
});
