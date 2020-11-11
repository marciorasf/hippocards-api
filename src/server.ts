import * as cors from "cors";
import * as express from "express";
import { Request, Response, NextFunction } from "express";

import "./middlewares/AuthMiddleware";
import { port } from "./config";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (_: Request, response: Response, next: NextFunction) {
  response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});
