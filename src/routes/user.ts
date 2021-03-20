import { Router } from "express";

import userController from "../controllers/user";

const router = Router();

const userRoutes = [router.post("/users", userController.create)];

export default userRoutes;
