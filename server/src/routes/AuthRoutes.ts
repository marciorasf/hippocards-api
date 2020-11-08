import { Router } from "express";

import AuthController from "../controllers/AuthController";

const router = Router();

const authRoutes = [
  router.post("/authenticate", AuthController.authenticate),
  router.get("/recover-password", AuthController.recoverPassword),
];

export default authRoutes;
