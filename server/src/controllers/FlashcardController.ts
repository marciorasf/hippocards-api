import { Response } from "express";

import { FlashcardCreateInput, FlashcardUpdateInput, Flashcard } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
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
      console.log({ error });
      return response.status(400).json({
        message: "Could not create flashcard",
      });
    }
  }

  public async getById(request: AuthReq, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    try {
      const flashcard = await FlashcardService.getById(flashcardId);

      return response.status(200).json({ flashcard });
    } catch (error) {
      console.log({ error });
      return response.status(404).json({
        message: "Could not retrieve flashcard",
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
      console.log({ error });
      return response.status(404).json({
        message: "Could not retrieve flashcards",
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
      console.log({ error });
      return response.status(404).json({
        message: "Could not retrieve random flashcard",
      });
    }

    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }
    } catch (error) {
      console.log({ error });
      return response.status(400).json({
        message: "Could not increase views",
      });
    }

    return response.status(200).json({ flashcard });
  }

  public async update(request: AuthReq, response: Response) {
    const { question, answer, isBookmarked, isKnown } = request.body;
    const flashcardId = Number(request.query.flashcardId);

    const payload: FlashcardUpdateInput = {
      question,
      answer,
      isBookmarked,
      isKnown,
    };

    try {
      const flashcard = await FlashcardService.update(flashcardId, payload);

      return response.status(200).json({ flashcard });
    } catch (error) {
      console.log({ error });
      return response.status(400).json({
        message: "Could not update flashcard",
      });
    }
  }
}

export default new FlashcardController();
