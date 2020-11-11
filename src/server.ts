import cors from "cors";
import express from "express";

import "./middlewares/AuthMiddleware";
import { environment, port } from "./config";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use("/api", routes);

// Get of static files should be the last
if (environment) {
  const baseDir = `${__dirname}/react/`;

  app.use(express.static(`${baseDir}`));

  app.get("/*", (request, response) => response.sendFile("index.html", { root: baseDir }));
}

app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});
