import { createConnection } from "typeorm";

import entities from "../entities";
import { __database_url__ } from "../env-variables";

createConnection({
  type: "postgres",
  url: __database_url__,
  entities,
});
