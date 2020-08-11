import { Request, Response } from "express";

import { FlashcardCreateInput } from "@prisma/client";

import { Flashcard, FlashcardUpdate } from "../interfaces/FlashcardInterface";
import FlashcardService from "../services/FlashcardService";
import convertBooleanToNumber from "../utils/convertBooleanToNumber";

class FlashcardController {
  public async create(request: Request, response: Response) {
    const { userId, question, answer } = request.body;

    const payload: FlashcardCreateInput = {
      question,
      answer,
      isBookmarked: false,
      isKnown: false,
      views: 0,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    try {
      const flashcard = await FlashcardService.create(payload);

      return response.status(201).json({
        flashcard,
      });
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }
  }

  public async getById(request: Request, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    try {
      const flashcard = await FlashcardService.getById(flashcardId);

      return response.status(200).json({ flashcard });
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }
  }

  public async index(request: Request, response: Response) {
    const userId = Number(request.query.userId);

    if (!userId) {
      return response.status(400).json({
        error: "Missing userId",
      });
    }

    try {
      const flashcards = await FlashcardService.index(userId);

      return response.status(200).json({ flashcards });
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }
  }

  public async getRandom(request: Request, response: Response) {
    const { query } = request;
    const userId = Number(query.userId);

    if (!userId) {
      return response.status(400).json({
        error: "Missing userId",
      });
    }

    const isBookmarked = query.isBookmarked && query.isBookmarked === "true";

    const isKnown = query.isKnown && query.isKnown === "true";

    const filters = {
      isBookmarked,
      isKnown,
    };

    let flashcard: Flashcard;
    try {
      flashcard = await FlashcardService.getRandom(userId, filters);
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }
    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }

    return response.status(200).json({ flashcard });
  }

  public async update(request: Request, response: Response) {
    const { question, answer, isBookmarked, isKnown } = request.body;
    const flashcardId = Number(request.query.flashcardId);

    const payload: FlashcardUpdate = {
      question,
      answer,
      isBookmarked,
      isKnown,
    };

    try {
      const flashcard = await FlashcardService.update(flashcardId, payload);

      return response.status(200).json({ flashcard });
    } catch (error) {
      return response.status(400).json({
        message: "Something happened",
      });
    }
  }
}

export default new FlashcardController();
