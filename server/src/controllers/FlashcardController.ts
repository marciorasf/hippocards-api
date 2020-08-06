import { Request, Response } from "express";

import db from "../database/connection";

interface Flashcard {
  user_id: number;
  question: string;
  answer: string;
}

class UserController {
  public async create(request: Request, response: Response) {
    const { user_id, question, answer } = request.body;

    const flashcard: Flashcard = {
      user_id,
      question,
      answer,
    };

    const [flashcard_id] = await db("flashcards").insert(flashcard);

    return response.status(201).json({
      flashcard_id,
    });
  }

  public async index(request: Request, response: Response) {
    const { user_id } = request.query;

    if (!user_id) {
      return response.status(400).json({
        error: "Missing user_id",
      });
    }

    const flashcards = await db("flashcards")
      .where("flashcards.user_id", "=", user_id)
      .select(["flashcards.*"]);

    return response.status(201).json({ flashcards });
  }
}

export default new UserController();
