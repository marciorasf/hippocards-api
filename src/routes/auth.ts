import { Router } from "express";

import authController from "@controllers/auth";
import authMiddleware from "@middlewares/auth";

const router = Router();

const authRoutes = [
  router.post("/login", authController.login),
  router.post("/recover-password", authController.recoverPassword),
  router.get("/ok", authMiddleware, authController.ok),
];

export default authRoutes;
