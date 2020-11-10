import { Router } from "express";

import UserController from "../controllers/UserController";
import UserTokenMiddleware from "../middlewares/UserTokenMiddleware";

const router = Router();

const userRoutes = [
  router.post("/user", UserController.create),
  router.get("/forgot-password", UserController.forgotPassword),
  router.put("/reset-password", UserTokenMiddleware, UserController.updatePassword),
];

export default userRoutes;
