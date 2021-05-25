import { createConnection } from "typeorm";
import "reflect-metadata";

import entities from "@/entities";
import {
  __postgres_host__,
  __postgres_database__,
  __postgres_password__,
  __postgres_port__,
  __postgres_username__,
  __postgres_logging__,
  __postgres_schema__,
} from "@config/postgres";

createConnection({
  type: "postgres",
  host: __postgres_host__,
  port: __postgres_port__,
  database: __postgres_database__,
  schema: __postgres_schema__,
  username: __postgres_username__,
  password: __postgres_password__,
  entities,
  synchronize: false,
  logging: __postgres_logging__,
});
