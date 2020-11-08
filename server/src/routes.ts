import express from "express";

import AuthController from "./controllers/AuthController";
import CategoryController from "./controllers/CategoryController";
import FlashcardController from "./controllers/FlashcardController";
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.post("/authenticate", AuthController.authenticate);
routes.get("/recover-password", AuthController.recoverPassword);

routes.post("/flashcard", AuthMiddleware, FlashcardController.create);
routes.get("/flashcard", AuthMiddleware, FlashcardController.getById);
routes.get("/flashcards", AuthMiddleware, FlashcardController.getAll);
routes.get("/flashcard/random", AuthMiddleware, FlashcardController.getRandom);
routes.put("/flashcard", AuthMiddleware, FlashcardController.update);
routes.delete("/flashcard", AuthMiddleware, FlashcardController.delete);

routes.post("/category", AuthMiddleware, CategoryController.create);
routes.get("/categories", AuthMiddleware, CategoryController.getAll);
routes.put("/category", AuthMiddleware, CategoryController.update);

export default routes;
