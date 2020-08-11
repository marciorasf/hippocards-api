import cors from "cors";
import express from "express";
import "./middlewares/Auth";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

const baseDir = `${__dirname}/build/`;

app.use(express.static(`${baseDir}`));

app.get("/", (request, response) => response.sendfile("index.html", { root: baseDir }));

app.use("/api", routes);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
