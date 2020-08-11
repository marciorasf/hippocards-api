import express from "express";

import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";
import Auth from "./middlewares/Auth";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", UserController.authenticate);

routes.put("/flashcard", Auth, FlashcardController.update);
routes.get("/flashcard", Auth, FlashcardController.getById);
routes.get("/flashcards", Auth, FlashcardController.index);
routes.get("/flashcard/random", Auth, FlashcardController.getRandom);
routes.post("/flashcard", Auth, FlashcardController.create);

export default routes;
