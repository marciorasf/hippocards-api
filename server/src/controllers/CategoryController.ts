import { Response } from "express";

import { CategoryCreateInput, CategoryUpdateInput } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
import CategoryService from "../services/CategoryService";

class CategoryController {
  public async create(request: AuthReq, response: Response) {
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
      console.log({ error });
      return response.status(400).json({
        message: "Could not create category",
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
      const categories = await CategoryService.index(userId);

      return response.status(200).json({ categories });
    } catch (error) {
      console.log({ error });
      return response.status(404).json({
        message: "Could not retrieve categories",
      });
    }
  }

  public async update(request: AuthReq, response: Response) {
    const { name } = request.body;
    const categoryId = Number(request.query.categoryId);

    const payload: CategoryUpdateInput = {
      name,
    };

    try {
      const category = await CategoryService.update(categoryId, payload);

      return response.status(200).json({ category });
    } catch (error) {
      console.log({ error });
      return response.status(400).json({
        message: "Could not update category",
      });
    }
  }

  public async delete(request: AuthReq, response: Response) {
    const categoryId = Number(request.query.categoryId);

    try {
      await CategoryService.delete(categoryId);

      return response.status(200).json();
    } catch (error) {
      console.log({ error });
      return response.status(400).json({
        message: "Could not delete category",
      });
    }
  }
}

export default new CategoryController();
