import { Router } from "express";

import UserController from "../controllers/user";
import UserTokenMiddleware from "../middlewares/user";

const router = Router();

const userRoutes = [
  router.post("/user", UserController.create),
  router.put("/user/password", UserTokenMiddleware, UserController.updatePassword),
];

export default userRoutes;
