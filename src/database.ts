import { createConnection } from "typeorm";

import { __database_url__ } from "./env-variables";

createConnection({
  type: "postgres",
  url: __database_url__,
});
