import { Router } from "express";

import categoryController from "../controllers/category";
import authMiddleware from "../middlewares/auth";

const router = Router();

const categoryRoutes = [
  router.post("/categories", authMiddleware, categoryController.create),
  router.get("/categories/:id", authMiddleware, categoryController.retrieveOne),
  router.get("/categories", authMiddleware, categoryController.retrieveAll),
  router.put("/categories/:id", authMiddleware, categoryController.update),
  router.delete("/categories/:id", authMiddleware, categoryController.delete),
];

export default categoryRoutes;
