import { Router } from "express";

import FlashcardController from "../controllers/flashcard";
import AuthMiddleware from "../middlewares/auth";

const router = Router();

const flashcardRoutes = [
  router.post("/flashcard", AuthMiddleware, FlashcardController.create),
  router.get("/flashcard/random", AuthMiddleware, FlashcardController.retrieveRandom),
  router.get("/flashcard/:id", AuthMiddleware, FlashcardController.retrieveById),
  router.get("/flashcards", AuthMiddleware, FlashcardController.retrieveAll),
  router.put("/flashcard/:id", AuthMiddleware, FlashcardController.update),
  router.delete("/flashcard/:id", AuthMiddleware, FlashcardController.delete),
];

export default flashcardRoutes;
