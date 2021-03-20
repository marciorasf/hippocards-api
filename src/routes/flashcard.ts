import { Router } from "express";

import flashcardController from "../controllers/flashcard";
import authMiddleware from "../middlewares/auth";

const router = Router();

const flashcardRoutes = [
  router.post("/flashcards", authMiddleware, flashcardController.create),
  router.get("/flashcards/random", authMiddleware, flashcardController.retrieveRandom),
  router.get("/flashcards/:id", authMiddleware, flashcardController.retrieveById),
  router.get("/flashcards", authMiddleware, flashcardController.retrieveAll),
  router.put("/flashcards/:id", authMiddleware, flashcardController.update),
  router.delete("/flashcards/:id", authMiddleware, flashcardController.delete),
];

export default flashcardRoutes;
