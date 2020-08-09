import { Request, Response } from "express";

import { Flashcard } from "../interfaces/FlashcardInterface";
import FlashcardService from "../services/FlashcardService";
import convertBooleanToNumber from "../utils/convertBooleanToNumber";

class FlashcardController {
  public async create(request: Request, response: Response) {
    const { user_id, question, answer } = request.body;

    const flashcard: Flashcard = {
      user_id,
      question,
      answer,
      is_bookmarked: false,
      is_known: false,
      views: 0,
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
    const { query } = request;
    const user_id = (query.user_id as unknown) as number;

    const is_bookmarked = convertBooleanToNumber(query.is_bookmarked === "true");

    const is_known = convertBooleanToNumber(query.is_known === "true");

    const filters = {
      is_bookmarked,
      is_known,
    };

    if (!user_id) {
      return response.status(400).json({
        error: "Missing user_id",
      });
    }

    let flashcard: any;
    try {
      [flashcard] = await FlashcardService.getRandom(user_id, filters);
    } catch (error) {
      console.log(error);
    }

    try {
      FlashcardService.incrementViews(flashcard.id);
    } catch (error) {
      console.log(error);
    }

    return response.status(201).json({ flashcard });
  }
}

export default new FlashcardController();
