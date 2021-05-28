import { Router } from "express";

import userController from "@controllers/user";

const router = Router();

const userRoutes = [
  router.post("/users", userController.create),
  router.post("/recover-password", userController.recoverPassword),
  router.get("/recover-password-token/:token", userController.verifyRecoverPasswordToken),
  router.put("/change-password", userController.updatePassword),
];

export default userRoutes;
