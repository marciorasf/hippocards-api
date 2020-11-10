import { Response } from "express";

import { CategoryCreateInput, CategoryUpdateInput } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
import CategoryService from "../services/CategoryService";
import ErrorService from "../services/ErrorService";

class CategoryController {
  async create(request: AuthReq, response: Response) {
    const { userId } = request;
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

      return response.status(201).json({
        category,
      });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_CREATE",
      });
    }
  }

  async getAll(request: AuthReq, response: Response) {
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({
        error: "MISSING_USER_ID",
      });
    }

    try {
      const categories = await CategoryService.getAll(userId);

      return response.status(200).json({ categories });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(404).json({
        message: "COLUD_NOT_GET",
      });
    }
  }

  async update(request: AuthReq, response: Response) {
    const { name } = request.body;
    const categoryId = Number(request.query.categoryId);

    const payload: CategoryUpdateInput = {
      name,
    };

    try {
      const category = await CategoryService.update(categoryId, payload);

      return response.status(200).json({ category });
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_UPDATE",
      });
    }
  }

  async delete(request: AuthReq, response: Response) {
    const categoryId = Number(request.query.categoryId);

    try {
      await CategoryService.delete(categoryId);

      return response.status(200).json();
    } catch (error) {
      ErrorService.handleError(error);

      return response.status(400).json({
        message: "COULD_NOT_DELETE",
      });
    }
  }
}

export default new CategoryController();
