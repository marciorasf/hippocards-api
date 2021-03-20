import { Router } from "express";

import categoryController from "../controllers/category";
import authMiddleware from "../middlewares/auth";

const router = Router();

const categoryRoutes = [
  router.post("/categories", authMiddleware, categoryController.create),
  router.get("/categories", authMiddleware, categoryController.retrieveAll),
  router.put("/categories/:id", authMiddleware, categoryController.update),
];

export default categoryRoutes;
