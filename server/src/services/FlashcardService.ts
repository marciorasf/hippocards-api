import { PrismaClient, FlashcardCreateInput } from "@prisma/client";

import { FlashcardFilters, FlashcardUpdate } from "../interfaces/FlashcardInterface";

const prisma = new PrismaClient();

class FlashcardService {
  private readonly attrsToSelect = ["id", "question", "answer", "isBookmarked", "isKnown", "views"];

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
    // TODO implement more efficient way https://www.gab.lc/articles/bigdata_postgresql_order_by_random/
    const nFlashcards = await prisma.flashcard.count({
      where: {
        userId,
        isBookmarked: filters.isBookmarked,
        isKnown: filters.isKnown,
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

  public async update(flashcardId: number, data: FlashcardUpdate) {
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
}

export default new FlashcardService();
