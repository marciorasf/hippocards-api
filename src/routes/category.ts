import { Router } from "express";

import CategoryController from "../controllers/category";
import authMiddleware from "../middlewares/auth";

const router = Router();

const categoryRoutes = [
  router.post("/category", authMiddleware, CategoryController.create),
  router.get("/categories", authMiddleware, CategoryController.retrieveAll),
  router.put("/category/:id", authMiddleware, CategoryController.update),
];

export default categoryRoutes;
