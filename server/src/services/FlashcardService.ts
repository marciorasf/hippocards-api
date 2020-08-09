import knex from "knex";

import db from "../database/connection";
import { Flashcard, FlashcardFilters } from "../interfaces/FlashcardInterface";

class FlashcardService {
  private readonly attrsToSelect = [
    "id",
    "question",
    "answer",
    "is_bookmarked",
    "is_known",
    "views",
  ];

  public async create(flashcard: Flashcard) {
    return db("flashcards").insert(flashcard);
  }

  public async index(user_id: number) {
    const query = db("flashcards")
      .where("flashcards.user_id", "=", user_id)
      .select(...this.attrsToSelect);

    return query;
  }

  public async getRandom(user_id: number, filters: FlashcardFilters) {
    const query = db("flashcards")
      .where("flashcards.user_id", "=", user_id)
      .andWhere("flashcards.is_bookmarked", "=", filters.is_bookmarked)
      .andWhere("flashcards.is_known", "=", filters.is_known)
      .orderByRaw("RANDOM()")
      .select(...this.attrsToSelect)
      .limit(1);

    return query;
  }

  public async update(flashcard_id: number, data: Flashcard) {
    const query = db("flashcards").where("flashcards.id", "=", flashcard_id).update(data);

    return query;
  }

  public async incrementViews(flashcard_id: number) {
    return db("flashcards").where("id", "=", flashcard_id).increment("views", 1);
  }
}

export default new FlashcardService();
