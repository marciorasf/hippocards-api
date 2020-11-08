import { Response } from "express";

import { FlashcardCreateInput, FlashcardUpdateInput, Flashcard } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
import CategoryService from "../services/CategoryService";
import ErrorService from "../services/ErrorService";
import FlashcardService from "../services/FlashcardService";

class FlashcardController {
  public async create(request: AuthReq, response: Response) {
    const { userId } = request;
    const { question, answer, category } = request.body;

    let payload: FlashcardCreateInput = {
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
      let categoryId: number;

      if (category.isNew) {
        const newCategory = await CategoryService.create({
          name: category.name,
          user: {
            connect: {
              id: userId,
            },
          },
        });

        categoryId = newCategory.id;
      } else {
        categoryId = category.id;
      }

      payload = {
        ...payload,
        category: {
          connect: {
            id: categoryId,
          },
        },
      };

      const flashcard = await FlashcardService.create(payload);

      return response.status(201).json({
        flashcard,
      });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_CREATE",
      });
    }
  }

  public async getById(request: AuthReq, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    try {
      const flashcard = await FlashcardService.getById(flashcardId);

      return response.status(200).json({ flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(404).json({
        message: "COULD_NOT_GET",
      });
    }
  }

  public async getAll(request: AuthReq, response: Response) {
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({
        error: "MISSING_USERID",
      });
    }

    try {
      const flashcards = await FlashcardService.getAll(userId);

      return response.status(200).json({ flashcards });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(404).json({
        message: "COLUD_NOT_GET",
      });
    }
  }

  public async getRandom(request: AuthReq, response: Response) {
    const { userId, query } = request;

    if (!userId) {
      return response.status(400).json({
        error: "MISSING_USER_ID",
      });
    }

    const isBookmarked = query?.isBookmarked === "true";

    const isKnown = query?.isKnown === "true";

    const categoryId = query?.categoryId && Number(query.categoryId);

    const filters = {
      isBookmarked,
      isKnown,
      categoryId,
    };

    let flashcard: Flashcard;

    try {
      flashcard = await FlashcardService.getRandom(userId, filters);
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(404).json({
        message: "COULD_NOT_GET",
      });
    }

    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_UPDATE",
      });
    }

    return response.status(200).json({ flashcard });
  }

  public async update(request: AuthReq, response: Response) {
    const { question, answer, isBookmarked, isKnown, categoryId } = request.body;
    const flashcardId = Number(request.query.flashcardId);

    let payload: FlashcardUpdateInput = {
      question,
      answer,
      isBookmarked,
      isKnown,
    };

    if (categoryId) {
      payload = {
        ...payload,
        category: {
          connect: {
            id: categoryId,
          },
        },
      };
    }

    try {
      const flashcard = await FlashcardService.update(flashcardId, payload);

      return response.status(200).json({ flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_UPDATE",
      });
    }
  }

  public async delete(request: AuthReq, response: Response) {
    const flashcardId = Number(request.query.flashcardId);
    try {
      await FlashcardService.delete(flashcardId);
      return response.status(204).json();
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_DELETE",
      });
    }
  }
}

export default new FlashcardController();
