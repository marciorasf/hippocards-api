import { Router } from "express";

import CategoryController from "../controllers/category";
import AuthMiddleware from "../middlewares/auth";

const router = Router();

const categoryRoutes = [
  router.post("/category", AuthMiddleware, CategoryController.create),
  router.get("/categories", AuthMiddleware, CategoryController.retrieveAll),
  router.put("/category/:id", AuthMiddleware, CategoryController.update),
];

export default categoryRoutes;
