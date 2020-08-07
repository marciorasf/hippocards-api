import express from "express";

import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Hello");
});

routes.post("/user", UserController.create);

routes.get("/flashcards/random", FlashcardController.getRandom);
routes.get("/flashcards", FlashcardController.index);
routes.post("/flashcard", FlashcardController.create);

export default routes;
