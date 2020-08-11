import express from "express";

import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";
import { verifyToken } from "./middlewares/Auth";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", UserController.authenticate);

routes.put("/flashcard", verifyToken, FlashcardController.update);
routes.get("/flashcard", verifyToken, FlashcardController.getById);
routes.get("/flashcards", verifyToken, FlashcardController.index);
routes.get("/flashcard/random", verifyToken, FlashcardController.getRandom);
routes.post("/flashcard", verifyToken, FlashcardController.create);

export default routes;
