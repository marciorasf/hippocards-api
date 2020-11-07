import express from "express";

import CategoryController from "./controllers/CategoryController";
import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";
import Auth from "./middlewares/AuthMiddleware";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", UserController.authenticate);
routes.get("/recover-password", UserController.recoverPassword);

routes.post("/flashcard", Auth, FlashcardController.create);
routes.get("/flashcard", Auth, FlashcardController.getById);
routes.get("/flashcards", Auth, FlashcardController.index);
routes.get("/flashcard/random", Auth, FlashcardController.getRandom);
routes.put("/flashcard", Auth, FlashcardController.update);
routes.delete("/flashcard", Auth, FlashcardController.delete);

routes.post("/category", Auth, CategoryController.create);
routes.get("/categories", Auth, CategoryController.index);
routes.put("/category", Auth, CategoryController.update);

export default routes;
