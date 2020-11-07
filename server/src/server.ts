import cors from "cors";
import express from "express";
import "./middlewares/AuthMiddleware";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

const baseDir = `${__dirname}/react/`;

app.use(express.static(`${baseDir}`));

app.use("/api", routes);

// Get of static files should be the last
if (process.env.NODE_ENV === "production") {
  app.get("/*", (request, response) => response.sendFile("index.html", { root: baseDir }));
}

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
