import { Router } from "express";

import FlashcardController from "../controllers/FlashcardController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

const flashcardRoutes = [
  router.post("/flashcard", AuthMiddleware, FlashcardController.create),
  router.get("/flashcard", AuthMiddleware, FlashcardController.getById),
  router.get("/flashcards", AuthMiddleware, FlashcardController.getAll),
  router.get("/flashcard/random", AuthMiddleware, FlashcardController.getRandom),
  router.put("/flashcard", AuthMiddleware, FlashcardController.update),
  router.delete("/flashcard", AuthMiddleware, FlashcardController.delete),
];

export default flashcardRoutes;
