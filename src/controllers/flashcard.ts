import { Request, Response } from "express";

import categoryService from "../services/category";
import errorService from "../services/error";
import flashcardService from "../services/flashcard";
import responseService from "../services/response";
import convertFilterValue from "../utils/convert-filter-value";
import removeUndefinedValues from "../utils/remove-undefined-values";

type Category = {
  id?: number;
  isNew: boolean;
  name?: string;
};

export default {
  async create(request: Request, response: Response) {
    const { userId } = response.locals;
    const { question, answer } = request.body;
    const category = request.body.category as Category;

    try {
      let categoryId: number;

      if (category.isNew) {
        if (!category.name) {
          throw Error("CATEGORY_NAME_NOT_PROVIDED");
        }

        const newCategory = await categoryService.create({
          name: category.name as string,
          user: userId,
        });

        categoryId = newCategory.id;
      } else {
        categoryId = category.id as number;
      }

      const flashcard = await flashcardService.create({
        question,
        answer,
        isBookmarked: false,
        isKnown: false,
        views: 0,
        user: userId,
        category: categoryId,
      });

      return responseService.created(response, { flashcard });
    } catch (error) {
      errorService.handleError(error);

      return responseService.badRequest(response, { message: "flashcard_not_created" });
    }
  },

  async retrieveById(request: Request, response: Response) {
    const flashcardId = Number(request.params.id);

    if (!flashcardId) {
      throw Error("flashcard_id_not_provided");
    }

    try {
      const flashcard = await flashcardService.retrieveById(flashcardId);

      return responseService.ok(response, { flashcard });
    } catch (error) {
      errorService.handleError(error);

      return responseService.notFound(response, { message: "flashcard_not_retrieved" });
    }
  },

  async retrieveAll(_request: Request, response: Response) {
    const { userId } = response.locals;

    try {
      const flashcards = await flashcardService.retrieveAll(userId);

      return responseService.ok(response, { flashcards });
    } catch (error) {
      errorService.handleError(error);

      return responseService.notFound(response, { message: "flashcards_not_retrieved" });
    }
  },

  async retrieveRandom(request: Request, response: Response) {
    const { query } = request;
    const { userId } = response.locals;

    try {
      const isBookmarked = convertFilterValue(query?.isBookmarked as string);

      const isKnown = convertFilterValue(query?.isKnown as string);

      const categoryId = query?.categoryId ? +query.categoryId : undefined;

      const filters = removeUndefinedValues({
        isBookmarked,
        isKnown,
        categoryId,
      });

      const currentFlashcardId = query?.currentFlashcardId ? +query?.currentFlashcardId : undefined;

      const flashcard = await flashcardService.retrieveRandom(userId, filters, currentFlashcardId);

      // There is no flashcard or at least not a different one
      if (!flashcard) {
        return responseService.notFound(response);
      }

      if (flashcard) {
        flashcardService.incrementViews(flashcard.id);
      }

      return responseService.ok(response, { flashcard });
    } catch (error) {
      errorService.handleError(error);
      return responseService.internalServerError(response, { message: "flashcard_not_retrieved" });
    }
  },

  async update(request: Request, response: Response) {
    const { question, answer, isBookmarked, isKnown, categoryId } = request.body;
    const flashcardId = Number(request.params.id);

    try {
      const flashcard = await flashcardService.update(
        flashcardId,
        removeUndefinedValues({
          question,
          answer,
          isBookmarked,
          isKnown,
          category: categoryId,
        })
      );

      return responseService.ok(response, { flashcard });
    } catch (error) {
      errorService.handleError(error);

      return responseService.internalServerError(response, { message: "flashcard_not_updated" });
    }
  },

  async delete(request: Request, response: Response) {
    const flashcardId = Number(request.params.id);

    try {
      await flashcardService.delete(flashcardId);

      return responseService.noContent(response);
    } catch (error) {
      errorService.handleError(error);

      return responseService.internalServerError(response, { message: "flashcard_not_deleted" });
    }
  },
};
