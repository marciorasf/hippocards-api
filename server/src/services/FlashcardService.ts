import db from "../database/connection";
import { Flashcard } from "../interfaces/FlashcardInterface";

class FlashcardService {
  public async create(flashcard: Flashcard) {
    return db("flashcards").insert(flashcard);
  }

  public async index(user_id: number) {
    const query = db("flashcards")
      .where("flashcards.user_id", "=", user_id)
      .select("id", "question", "answer");

    return query;
  }

  public async getRandom(user_id: number) {
    const query = db("flashcards")
      .where("flashcards.user_id", "=", user_id)
      .orderByRaw("RANDOM()")
      .select("id", "question", "answer")
      .limit(1);

    return query;
  }
}

export default new FlashcardService();
