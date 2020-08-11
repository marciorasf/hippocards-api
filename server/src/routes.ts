import express from "express";

import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", UserController.authenticate);

routes.put("/flashcard", FlashcardController.update);
routes.get("/flashcard", FlashcardController.getById);
routes.get("/flashcards", FlashcardController.index);
routes.get("/flashcard/random", FlashcardController.getRandom);
routes.post("/flashcard", FlashcardController.create);

export default routes;
