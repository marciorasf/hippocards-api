import { Response } from "express";

import { FlashcardCreateInput, FlashcardUpdateInput, Flashcard } from "@prisma/client";

import { AuthReq } from "../interfaces/AuthInterface";
import CategoryService from "../services/CategoryService";
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

    const isBookmarked = query?.isBookmarked === "true";

    const isKnown = query?.isKnown === "true";

    const categoryId = query?.categoryId && Number(query.categoryId);

    const filters = {
      isBookmarked,
      isKnown,
      categoryId,
    };
    console.log(filters);

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
      console.log({ error });
      return response.status(400).json({
        message: "Could not update flashcard",
      });
    }
  }
}

export default new FlashcardController();
