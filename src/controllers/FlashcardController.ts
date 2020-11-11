import { Request, Response } from "express";

import { FlashcardCreateInput, FlashcardUpdateInput, Flashcard } from "@prisma/client";

import CategoryService from "../services/CategoryService";
import ErrorService from "../services/ErrorService";
import FlashcardService from "../services/FlashcardService";
import ResponseService from "../services/ResponseService";
import convertFilterValue from "../utils/convertFilterValue";

class FlashcardController {
  async create(request: Request, response: Response) {
    const { userId } = response.locals;
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

  async getById(request: Request, response: Response) {
    const flashcardId = Number(request.query.flashcardId);

    try {
      const flashcard = await FlashcardService.getById(flashcardId);

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.notFound(response, { message: "FLASHCARD_NOT_GOT" });
    }
  }

  async getAll(_request: Request, response: Response) {
    const { userId } = response.locals;

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

  async getRandom(request: Request, response: Response) {
    const { query } = request;
    const { userId } = response.locals;

    if (!userId) {
      return ResponseService.badRequest(response, { message: "MISSING_USER_ID" });
    }

    let flashcard: Flashcard | null;

    try {
      const isBookmarked = convertFilterValue(query?.isBookmarked as string);

      const isKnown = convertFilterValue(query?.isKnown as string);

      const categoryId = query?.categoryId ? +query.categoryId : undefined;

      const filters = {
        isBookmarked,
        isKnown,
        categoryId,
      };

      const currentFlashcardId = query?.currentFlashcardId ? +query?.currentFlashcardId : undefined;

      flashcard = await FlashcardService.getRandom(userId, currentFlashcardId, filters);

      // There is no flashcard or at least not a different one
      if (!flashcard) {
        return ResponseService.notFound(response);
      }
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

  async update(request: Request, response: Response) {
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

  async delete(request: Request, response: Response) {
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
