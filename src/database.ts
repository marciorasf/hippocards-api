import { createConnection } from "typeorm";
import "reflect-metadata";

import entities from "@/entities";
import { __postgres_url__ } from "@config/postgres";

createConnection({
  type: "postgres",
  url: __postgres_url__,
  entities,
  synchronize: true,
  logging: true,
});
