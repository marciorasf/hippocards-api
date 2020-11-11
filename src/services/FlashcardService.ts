import { PrismaClient, FlashcardCreateInput, FlashcardUpdateInput } from "@prisma/client";

import { FlashcardFilters } from "../interfaces/FlashcardInterface";

const prisma = new PrismaClient();

class FlashcardService {
  async create(data: FlashcardCreateInput) {
    return prisma.flashcard.create({
      data,
    });
  }

  async getById(flashcardId: number) {
    return prisma.flashcard.findOne({ where: { id: flashcardId } });
  }

  async getAll(userId: number) {
    return prisma.flashcard.findMany({
      where: {
        userId,
      },
    });
  }

  async getRandom(
    userId: number,
    currentFlashcardId: number | undefined,
    filters: FlashcardFilters
  ) {
    const nFlashcards = await prisma.flashcard.count({
      where: {
        userId,
        id: { not: currentFlashcardId },
        isBookmarked: filters.isBookmarked,
        isKnown: filters.isKnown,
        categoryId: filters.categoryId,
      },
    });

    if (nFlashcards < 1) {
      return null;
    }

    const skip = Math.floor(Math.random() * nFlashcards);

    const [flashcard] = await prisma.flashcard.findMany({
      take: 1,
      skip,
      where: {
        userId,
        id: { not: currentFlashcardId },
        isBookmarked: filters.isBookmarked,
        isKnown: filters.isKnown,
      },
    });

    return flashcard;
  }

  async update(flashcardId: number, data: FlashcardUpdateInput) {
    return prisma.flashcard.update({
      where: { id: flashcardId },
      data,
    });
  }

  async incrementViews(flashcardId: number) {
    const flashcard = await prisma.flashcard.findOne({
      where: {
        id: flashcardId,
      },
      select: {
        views: true,
      },
    });

    return prisma.flashcard.update({
      where: {
        id: flashcardId,
      },
      data: {
        views: (flashcard?.views || 0) + 1,
      },
    });
  }

  async delete(flashcardId: number) {
    return prisma.flashcard.delete({
      where: {
        id: flashcardId,
      },
    });
  }
}

export default new FlashcardService();
