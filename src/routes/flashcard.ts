import { Router } from "express";

import FlashcardController from "../controllers/flashcard";
import authMiddleware from "../middlewares/auth";

const router = Router();

const flashcardRoutes = [
  router.post("/flashcard", authMiddleware, FlashcardController.create),
  router.get("/flashcard/random", authMiddleware, FlashcardController.retrieveRandom),
  router.get("/flashcard/:id", authMiddleware, FlashcardController.retrieveById),
  router.get("/flashcards", authMiddleware, FlashcardController.retrieveAll),
  router.put("/flashcard/:id", authMiddleware, FlashcardController.update),
  router.delete("/flashcard/:id", authMiddleware, FlashcardController.delete),
];

export default flashcardRoutes;
