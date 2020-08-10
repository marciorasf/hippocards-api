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

    const flashcard = await FlashcardService.create(payload);

    return response.status(201).json({
      flashcard,
    });
  }

  public async getById(request: Request, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    const flashcard = await FlashcardService.getById(flashcardId);

    return response.status(200).json({ flashcard });
  }

  public async index(request: Request, response: Response) {
    const userId = Number(request.query.userId);

    if (!userId) {
      return response.status(400).json({
        error: "Missing userId",
      });
    }

    const flashcards = await FlashcardService.index(userId);

    return response.status(200).json({ flashcards });
  }

  public async getRandom(request: Request, response: Response) {
    const { query } = request;
    const userId = Number(query.userId);

    const isBookmarked = query.isBookmarked && query.isBookmarked === "true";

    const isKnown = query.isKnown && query.isKnown === "true";

    const filters = {
      isBookmarked,
      isKnown,
    };

    if (!userId) {
      return response.status(400).json({
        error: "Missing userId",
      });
    }

    let flashcard: Flashcard;
    try {
      flashcard = await FlashcardService.getRandom(userId, filters);
    } catch (error) {
      console.log(error);
    }
    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }
    } catch (error) {
      console.log(error);
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

    const flashcard = await FlashcardService.update(flashcardId, payload);

    return response.status(200).json({ flashcard });
  }
}

export default new FlashcardController();
