import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import "@/database";
import "@middlewares/auth";
import routes from "@/routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;
