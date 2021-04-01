import { getRepository } from "typeorm";

import { Flashcard } from "@entities/flashcard";
import { FlashcardFilters } from "@interfaces/flashcard";

interface CommonData {
  question: string;
  answer: string;
  isBookmarked: boolean;
  isKnown: boolean;
  category: any;
}

interface CreateData extends CommonData {
  user: any;
  views: number;
}

type UpdateData = Partial<CommonData>;

const flashcardService = {
  async create(data: CreateData) {
    return Flashcard.create(data).save();
  },

  async retrieveById(flashcardId: number) {
    return Flashcard.findOne({ where: { id: flashcardId } });
  },

  async retrieveAll(userId: number) {
    return Flashcard.find({
      where: {
        user: userId,
      },
    });
  },

  async retrieveRandom(userId: number, filters: FlashcardFilters, currentFlashcardId?: number) {
    const query = getRepository(Flashcard)
      .createQueryBuilder("flashcard")
      .where("flashcard.userId = :userId", { userId });

    if (currentFlashcardId) {
      query.andWhere("flashcard.id != :currentFlashcardId", { currentFlashcardId });
    }

    if ("isKnown" in filters) {
      query.andWhere("flashcard.isKnown = :isKnown", { isKnown: filters.isKnown });
    }
    if ("isBookmarked" in filters) {
      query.andWhere("flashcard.isBookmarked = :isBookmarked", {
        isBookmarked: filters.isBookmarked,
      });
    }
    if ("categoryId" in filters) {
      query.andWhere("flashcard.categoryId = :categoryId", { categoryId: filters.categoryId });
    }

    query.orderBy("RANDOM()");

    const randomFlashcard = query.getOne();

    return randomFlashcard;
  },

  async update(flashcardId: number, data: UpdateData) {
    await Flashcard.update({ id: flashcardId }, data);

    return Flashcard.findOne({
      where: {
        id: flashcardId,
      },
    });
  },

  async incrementViews(flashcardId: number) {
    const flashcard = await Flashcard.findOneOrFail({
      where: {
        id: flashcardId,
      },
    });

    return Flashcard.update(
      {
        id: flashcardId,
      },
      {
        views: flashcard.views + 1,
      }
    );
  },

  async delete(flashcardId: number) {
    return Flashcard.delete({
      id: flashcardId,
    });
  },
};

export default flashcardService;
