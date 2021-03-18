import { Router } from "express";

import CategoryController from "../controllers/CategoryController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

const categoryRoutes = [
  router.post("/category", AuthMiddleware, CategoryController.create),
  router.get("/categories", AuthMiddleware, CategoryController.retrieveAll),
  router.put("/category/:id", AuthMiddleware, CategoryController.update),
];

export default categoryRoutes;
