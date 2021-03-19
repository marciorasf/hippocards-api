import { Router } from "express";

import UserController from "../controllers/user";

const router = Router();

const userRoutes = [router.post("/user", UserController.create)];

export default userRoutes;
