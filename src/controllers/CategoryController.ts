import { Request, Response } from "express";

import { CategoryCreateInput, CategoryUpdateInput } from "@prisma/client";

import CategoryService from "../services/CategoryService";
import ErrorService from "../services/ErrorService";
import ResponseService from "../services/ResponseService";

class CategoryController {
  async create(request: Request, response: Response) {
    const { userId } = response.locals;
    const { name } = request.body;

    const payload: CategoryCreateInput = {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    try {
      const category = await CategoryService.create(payload);

      if (!category) {
        throw new Error();
      }

      return ResponseService.created(response, { category });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "CATEGORY_NOT_CREATED" });
    }
  }

  async getAll(_request: Request, response: Response) {
    const { userId } = response.locals;

    if (!userId) {
      return response.status(400).json({
        error: "MISSING_USER_ID",
      });
    }

    try {
      const categories = await CategoryService.getAll(userId);

      return ResponseService.ok(response, { categories });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, {
        message: "CATEGORIES_NOT_GOT",
      });
    }
  }

  async update(request: Request, response: Response) {
    const { name } = request.body;
    const categoryId = Number(request.query.categoryId);

    const payload: CategoryUpdateInput = {
      name,
    };

    try {
      const category = await CategoryService.update(categoryId, payload);

      return ResponseService.ok(response, { category });
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, {
        message: "CATEGORY_NOT_UPDATED",
      });
    }
  }

  async delete(request: Request, response: Response) {
    const categoryId = Number(request.query.categoryId);

    try {
      await CategoryService.delete(categoryId);

      return ResponseService.noContent(response);
    } catch (error) {
      ErrorService.handleError(error);

      return ResponseService.internalServerError(response, { message: "CATEGORY_NOT_DELETED" });
    }
  }
}

export default new CategoryController();
