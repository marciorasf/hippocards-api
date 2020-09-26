import { PrismaClient, FlashcardCreateInput, FlashcardUpdateInput } from "@prisma/client";

import { FlashcardFilters } from "../interfaces/FlashcardInterface";

const prisma = new PrismaClient();

class FlashcardService {
  public async create(data: FlashcardCreateInput) {
    return prisma.flashcard.create({
      data,
    });
  }

  public async getById(flashcardId: number) {
    return prisma.user.findOne({ where: { id: flashcardId } });
  }

  public async index(userId: number) {
    return prisma.flashcard.findMany({
      where: {
        userId,
      },
    });
  }

  public async getRandom(userId: number, filters: FlashcardFilters) {
    const nFlashcards = await prisma.flashcard.count({
      where: {
        userId,
        isBookmarked: filters.isBookmarked,
        isKnown: filters.isKnown,
        categoryId: filters.categoryId,
      },
    });

    const skip = Math.floor(Math.random() * nFlashcards);

    const [flashcard] = await prisma.flashcard.findMany({
      take: 1,
      skip,
      where: {
        userId,
        isBookmarked: filters.isBookmarked,
        isKnown: filters.isKnown,
      },
    });

    return flashcard;
  }

  public async update(flashcardId: number, data: FlashcardUpdateInput) {
    return prisma.flashcard.update({
      where: { id: flashcardId },
      data,
    });
  }

  public async incrementViews(flashcardId: number) {
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
        views: flashcard.views + 1,
      },
    });
  }

  public async delete(flashcardId: number) {
    return prisma.flashcard.delete({
      where: {
        id: flashcardId,
      },
    });
  }
}

export default new FlashcardService();
