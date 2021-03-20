import { Router } from "express";

import AuthController from "../controllers/auth";
import authMiddleware from "../middlewares/auth";

const router = Router();

const authRoutes = [
  router.post("/login", AuthController.login),
  router.get("/logout", AuthController.logout),
  router.get("/check", authMiddleware, AuthController.ok),
];

export default authRoutes;
