import { Request, Response } from "express";

import FlashcardService from "@src/services/FlashcardService";

import db from "../database/connection";
import { Flashcard } from "../interfaces/FlashcardInterface";

class FlashcardController {
  public async create(request: Request, response: Response) {
    const { user_id, question, answer } = request.body;

    const flashcard: Flashcard = {
      user_id,
      question,
      answer,
    };

    const [flashcard_id] = await FlashcardService.create(flashcard);

    return response.status(201).json({
      flashcard_id,
    });
  }

  public async index(request: Request, response: Response) {
    const user_id = (request.query.user_id as unknown) as number;

    if (!user_id) {
      return response.status(400).json({
        error: "Missing user_id",
      });
    }

    const flashcards = await FlashcardService.index(user_id);

    return response.status(201).json({ flashcards });
  }

  public async getRandom(request: Request, response: Response) {
    const user_id = (request.query.user_id as unknown) as number;

    if (!user_id) {
      return response.status(400).json({
        error: "Missing user_id",
      });
    }

    const [flashcard] = await FlashcardService.getRandom(user_id);

    return response.status(201).json({ flashcard });
  }
}

export default new FlashcardController();
