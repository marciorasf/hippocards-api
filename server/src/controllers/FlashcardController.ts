import { Response } from "express";

import { FlashcardCreateInput, FlashcardUpdateInput, Flashcard } from "@prisma/client";

import { AuthRequest } from "../interfaces/AuthInterface";
import CategoryService from "../services/CategoryService";
import ErrorService from "../services/ErrorService";
import FlashcardService from "../services/FlashcardService";
import ResponseService from "../services/ResponseService";

class FlashcardController {
  async create(request: AuthRequest, response: Response) {
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

      return ResponseService.created(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.badRequest(response, { message: "FLASHCARD_NOT_CREATED" });
    }
  }

  async getById(request: AuthRequest, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    try {
      const flashcard = await FlashcardService.getById(flashcardId);

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.notFound(response, { message: "FLASHCARD_NOT_GOT" });
    }
  }

  async getAll(request: AuthRequest, response: Response) {
    const { userId } = request;

    if (!userId) {
      return ResponseService.badRequest(response, { message: "MISSING_USER_ID" });
    }

    try {
      const flashcards = await FlashcardService.getAll(userId);

      return ResponseService.ok(response, { flashcards });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.notFound(response, { message: "FLASHCARDS_NOT_GOT" });
    }
  }

  async getRandom(request: AuthRequest, response: Response) {
    const { userId, query } = request;

    if (!userId) {
      return ResponseService.badRequest(response, { message: "MISSING_USER_ID" });
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

      return ResponseService.internalServerError(response, { message: "FLASHCARD_NOT_GOT" });
    }

    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "FLASHCARD_NOT_UPDATED" });
    }
  }

  async update(request: AuthRequest, response: Response) {
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

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "FLASHCARD_NOT_UPDATED" });
    }
  }

  async delete(request: AuthRequest, response: Response) {
    const flashcardId = Number(request.query.flashcardId);
    try {
      await FlashcardService.delete(flashcardId);

      return ResponseService.noContent(response);
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "FLASHCARD_NOT_DELETED" });
    }
  }
}

export default new FlashcardController();
