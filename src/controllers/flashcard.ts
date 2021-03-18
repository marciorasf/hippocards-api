import { Request, Response } from "express";

import { Flashcard, FlashcardCreateInput, FlashcardUpdateInput } from "@prisma/client";

import CategoryService from "../services/category";
import ErrorService from "../services/error";
import FlashcardService from "../services/flashcard";
import ResponseService from "../services/response";
import convertFilterValue from "../utils/conver-filter-value";

type Category = {
  id?: number;
  isNew: boolean;
  name?: string;
};

class FlashcardController {
  async create(request: Request, response: Response) {
    const { userId } = response.locals;
    const { question, answer } = request.body;
    const category = request.body.category as Category;

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
        if (!category.name) {
          throw Error("CATEGORY_NAME_NOT_PROVIDED");
        }

        const newCategory = await CategoryService.create({
          name: category.name as string,
          user: {
            connect: {
              id: userId,
            },
          },
        });

        categoryId = newCategory.id;
      } else {
        categoryId = category.id as number;
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

      return ResponseService.badRequest(response, { message: "flashcard_not_created" });
    }
  }

  async retrieveById(request: Request, response: Response) {
    const flashcardId = Number(request.params.id);

    if (!flashcardId) {
      throw Error("flashcard_id_not_provided");
    }

    try {
      const flashcard = await FlashcardService.retrieveById(flashcardId);

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.notFound(response, { message: "flashcard_not_retrieved" });
    }
  }

  async retrieveAll(_request: Request, response: Response) {
    const { userId } = response.locals;

    try {
      const flashcards = await FlashcardService.retrieveAll(userId);

      return ResponseService.ok(response, { flashcards });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.notFound(response, { message: "flashcards_not_retrieved" });
    }
  }

  async retrieveRandom(request: Request, response: Response) {
    const { query } = request;
    const { userId } = response.locals;

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

      flashcard = await FlashcardService.retrieveRandom(userId, currentFlashcardId, filters);

      // There is no flashcard or at least not a different one
      if (!flashcard) {
        return ResponseService.notFound(response);
      }
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "flashcard_not_got" });
    }

    try {
      if (flashcard) {
        FlashcardService.incrementViews(flashcard.id);
      }

      return ResponseService.ok(response, { flashcard });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "flashcard_not_updated" });
    }
  }

  async update(request: Request, response: Response) {
    const { question, answer, isBookmarked, isKnown, categoryId } = request.body;
    const flashcardId = Number(request.params.id);

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

      return ResponseService.internalServerError(response, { message: "flashcard_not_updated" });
    }
  }

  async delete(request: Request, response: Response) {
    const flashcardId = Number(request.params.id);

    try {
      await FlashcardService.delete(flashcardId);

      return ResponseService.noContent(response);
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "flashcard_not_deleted" });
    }
  }
}

export default new FlashcardController();
