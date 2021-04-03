import { Request, Response } from "express";

import categoryService from "@services/category";
import errorService from "@services/error";
import responseService from "@services/response";
import removeUndefinedValues from "@utils/remove-undefined-values";

const categoryController = {
  async create(request: Request, response: Response) {
    const { userId } = response.locals;
    const { name } = request.body;

    try {
      const category = await categoryService.create({
        name,
        user: userId,
      });

      if (!category) {
        throw new Error();
      }

      return responseService.created(response, { category });
    } catch (err) {
      errorService.handle(err);

      return responseService.internalServerError(response, { message: "category_not_created" });
    }
  },

  async retrieveAll(_request: Request, response: Response) {
    const { userId } = response.locals;

    try {
      const categories = await categoryService.retrieveAllWithFlashcards(userId);

      const categoriesWithFlashcardsInfo = categories.map((category) => {
        const flashcardsCount = category.flashcards.length;
        let isKnownCount = 0;
        let isBookmarkedCount = 0;

        category.flashcards.forEach((flashcard) => {
          if (flashcard.isKnown) {
            isKnownCount += 1;
          }

          if (flashcard.isBookmarked) {
            isBookmarkedCount += 1;
          }
        });

        delete category?.flashcards;

        return {
          ...category,
          flashcardsInfo: {
            flashcardsCount,
            isKnownCount,
            isBookmarkedCount,
          },
        };
      });

      return responseService.ok(response, { categories: categoriesWithFlashcardsInfo });
    } catch (err) {
      errorService.handle(err);

      return responseService.internalServerError(response, {
        message: "categories_not_retrieved",
      });
    }
  },

  async retrieveOne(request: Request, response: Response) {
    const categoryId = Number(request.params.id);

    try {
      const category = await categoryService.retrieveOneWithFlashcards(categoryId);

      return responseService.ok(response, { category });
    } catch (err) {
      errorService.handle(err);

      return responseService.internalServerError(response, {
        message: "category_not_retrieved",
      });
    }
  },

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const categoryId = Number(request.params.id);

    try {
      const category = await categoryService.update(
        categoryId,
        removeUndefinedValues({
          name,
        })
      );

      return responseService.ok(response, { category });
    } catch (err) {
      errorService.handle(err);

      return responseService.internalServerError(response, {
        message: "category_not_updated",
      });
    }
  },

  async delete(request: Request, response: Response) {
    const categoryId = Number(request.params.id);

    try {
      await categoryService.delete(categoryId);

      return responseService.noContent(response);
    } catch (err) {
      errorService.handle(err);

      return responseService.internalServerError(response, { message: "category_not_deleted" });
    }
  },
};

export default categoryController;
