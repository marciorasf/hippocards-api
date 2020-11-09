import { Router } from "express";

import AuthController from "../controllers/AuthController";

const router = Router();

const authRoutes = [
  router.post("/authenticate", AuthController.authenticate),
  router.get("/forgot-password", AuthController.forgotPassword),
];

export default authRoutes;
