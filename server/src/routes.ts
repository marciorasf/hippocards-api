import express from "express";

import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";

const routes = express.Router();

routes.post("/user", UserController.create);

routes.get("/flashcard/random", FlashcardController.getRandom);
routes.get("/flashcards", FlashcardController.index);
routes.post("/flashcard", FlashcardController.create);

export default routes;
