import { Response } from "express";

import { FlashcardCreateInput } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
import { Flashcard, FlashcardUpdate } from "../interfaces/FlashcardInterface";
import FlashcardService from "../services/FlashcardService";

class FlashcardController {
  public async create(request: AuthReq, response: Response) {
    const { userId } = request;
    const { question, answer } = request.body;

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

  public async getById(request: AuthReq, response: Response) {
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

  public async index(request: AuthReq, response: Response) {
    const { userId } = request;

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

  public async getRandom(request: AuthReq, response: Response) {
    const { userId, query } = request;

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

  public async update(request: AuthReq, response: Response) {
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
